import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Users } from 'src/models/users/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSignUpDto } from './dto/UserSignUp.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      role: user.role,
      sub: user.userId,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        privateKey: jwtConstants.secret,
      }),
    };
  }

  async signUp(userDto: UserSignUpDto) {
    const { firstName, lastName, email, password } = userDto;
    // hash the user password
    // generate the salt
    const salt = randomBytes(8).toString('hex');

    // hash password and the salt together
    const hashed = (await scrypt(password, salt, 32)) as Buffer;

    // jon the hashed result and the salt result together
    const passwordScrypt: string = salt + '.' + hashed.toString('hex');

    //create the new user and save it
    return await this.usersService.create(
      firstName,
      lastName,
      email,
      passwordScrypt,
    );
  }
}
