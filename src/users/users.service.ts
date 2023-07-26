import { Injectable } from '@nestjs/common';
import { User } from './entites/user.entity';
import { _getRandomInt } from '@/app.utils';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: _getRandomInt(),
      username: 'admin',
      passwordHash: 'admin',
      datetimeSignUp: 1690352179,
      role: 'admin',
      refreshTokenHash: 'awdwadwdaw',
    },
  ];

  async createUser(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
  findAllUsers() {
    return this.users;
  }

  async findUser(userId: number): Promise<User | undefined> {
    return this.users.find((user) => user.id == userId);
  }
  async updateUser(user: User) {
    this.users.push(user);
  }

  async findUserByName(username: string): Promise<User> {
    return this.users.find((user) => user.username == username);
  }
}
