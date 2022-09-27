import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 165421,
      email: 'admin@gmail.com',
      password: '123123123',
      role: 'admin',
    },
    {
      userId: 2654321,
      email: 'nguyenvanphuocbkdn79@gmail.com',
      password: '123123123',
      role: 'guess',
    },

    {
      userId: 23453534,
      email: 'nguyenvanphuoc',
      password: '123123123',
      role: 'guess',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
