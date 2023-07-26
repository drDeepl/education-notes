import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { User } from '@/users/entites/user.entity';
import { Tokens } from './types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
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

  async signUp(dto: SignUpDto): Promise<Tokens> {
    const hashData = await this.hashData(dto.password);
    const newUser: User = new User(dto.username, hashData, Date.now());
    const user = await this.usersService.createUser(newUser);
    const tokens = await this.getTokens(user.id, user.username);
    this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashData: string = await this.hashData(refreshToken);
    const user: User = await this.usersService.findUser(userId);
    user.refreshTokenHash = hashData;
    await this.usersService.updateUser(user);
  }
  async signIn(dto: SignInDto): Promise<Tokens> {
    const user: User = await this.usersService.findUserByName(dto.username);
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
    this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }
}
