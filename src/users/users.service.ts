import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, Logger, HttpStatus, HttpException } from '@nestjs/common';
import { User } from './entites/user.entity';
import { Role } from './types';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('USERS.SERVICE');
  constructor(private prisma: PrismaService) {}

  async findUsers(): Promise<User[]> {
    this.logger.verbose('findUsers');
    const users: User[] = await this.prisma.user.findMany();
    return users;
  }
  async findById(userId: number): Promise<User> {
    this.logger.verbose('findById');

    const user: User = await this.prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async deleteUser(userId: number) {
    this.logger.verbose('deleteUser');
    try {
      return await this.prisma.user.delete({ where: { id: userId } });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findRoles(): Promise<string[]> {
    this.logger.verbose('findUsers');
    const roles: Role[] = await this.prisma.role.findMany();
    const titleRoles: string[] = roles.map((role) => role.role);
    return titleRoles;
  }
  async addRole(role: string): Promise<Role> {
    return await this.prisma.role.create({ data: { role: role } });
  }
}
