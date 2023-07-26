import { Injectable } from '@nestjs/common';
import { User } from './entites/user.entity';
import { _getRandomInt } from '@/app.utils';
@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: _getRandomInt(),
      username: 'admin',
      password: 'admin',
      datetimeSignUp: 1690352179,
      role: 'admin',
    },
  ];

  createUser(user: User) {
    this.users.push(user);
    return user;
  }
  findAllUsers() {
    return this.users;
  }

  async findUser(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username == username);
  }
}
