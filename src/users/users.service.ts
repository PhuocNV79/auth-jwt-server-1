import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/models/users/entities/users.entity';
import { Repository } from 'typeorm';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private repo: Repository<Users>) {}
  private readonly users = [
    {
      userId: 165421,
      email: 'admin@gmail.com',
      password: '123',
      role: 'admin',
    },
    {
      userId: 2654321,
      email: 'nguyenvanphuocbkdn79@gmail.com',
      password: '123',
      role: 'guess',
    },

    {
      userId: 23453534,
      email: 'nguyenvanphuoc',
      password: '123',
      role: 'guess',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async create(firstName, lastName, email, password) {
    const user = this.repo.create({ firstName, lastName, email, password });
    return this.repo.save(user);
  }
}
