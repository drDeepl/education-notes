import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { User } from './entites/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('USERS.SERVICE');
  constructor(private prisma: PrismaService) {}

  async findUsers(): Promise<User[]> {
    this.logger.verbose('findUsers');
    const users: User[] = await this.prisma.user.findMany();
    return users;
  }
}
