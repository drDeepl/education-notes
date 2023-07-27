import { Injectable } from '@nestjs/common';
import { User } from './entites/user.entity';
import { _getRandomInt } from '@/app.utils';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 11,
      username: 'admin',
      passwordHash: 'admin',
      createdAt: 1690352179,
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
  async findUserByName(username: string): Promise<User> {
    return this.users.find((user) => user.username == username);
  }
  async updateUserRefreshToken(user: User) {
    this.users.map((userArray) =>
      userArray.id === user.id
        ? (userArray.refreshTokenHash = user.refreshTokenHash)
        : '',
    );
  }

  async clearRefreshTokenHash(userId: number): Promise<User> {
    const user: User = await this.findUser(userId);
    user.refreshTokenHash = null;
    await this.updateUserRefreshToken(user);
    return user;
  }
}
