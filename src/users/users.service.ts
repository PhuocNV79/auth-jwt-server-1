import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/models/users/entities/users.entity';
import { Repository } from 'typeorm';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private repo: Repository<Users>) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.repo.findOneBy({ email });
  }

  async create(firstName, lastName, email, password) {
    try {
      const user = this.repo.create({ firstName, lastName, email, password });

      return this.repo.save(user);
    } catch (error) {
      throw new Error('an error occur in out system');
    }
  }
}
