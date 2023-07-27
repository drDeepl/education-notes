import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { User } from '@/users/entites/user.entity';
import { Tokens } from './types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AUTH.SERVICE');
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: number, username: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        { secret: this.configService.get('JWT_SECRET'), expiresIn: 60 * 5 },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: 60 * 60 * 24 * 7, // 60 sec * 60 min * 24 hour * 7 days
        },
      ),
    ]);
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async updateHashRefreshToken(userId: number, refreshToken: string) {
    this.logger.verbose('updateRefreshToken');
    const hashData: string = await this.hashData(refreshToken);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshTokenHash: hashData,
      },
    });
  }

  async signUp(dto: SignUpDto): Promise<Tokens> {
    this.logger.verbose('signUp');
    const hashData = await this.hashData(dto.password);
    const newUser = await this.prisma.user.create({
      data: { username: dto.username, passwordHash: hashData, role: 'user' },
    });
    const tokens = await this.getTokens(newUser.id, newUser.username);
    this.updateHashRefreshToken(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async signIn(dto: SignInDto): Promise<Tokens> {
    this.logger.verbose('signIn');
    const user = await this.prisma.user.findFirst({
      where: {
        username: dto.username,
      },
    });
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }
    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!passwordMatches) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.getTokens(user.id, user.username);
    this.updateHashRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: number) {
    this.logger.verbose('logout');
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshTokenHash: null,
      },
    });
  }

  async refreshTokens(userId: number, refreshToken: string): Promise<Tokens> {
    this.logger.verbose('refreshTokens');

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    console.log(user);
    if (!user) {
      throw new ForbiddenException('Access Denided');
    }

    if (!user.refreshTokenHash) {
      throw new ForbiddenException('Refresh token is empty');
    }

    const comparedRefreshToken = await bcrypt.compare(
      refreshToken,
      user.refreshTokenHash,
    );
    if (!comparedRefreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user.id, user.username);
    this.updateHashRefreshToken(userId, tokens.refresh_token);
    return tokens;
  }
}
