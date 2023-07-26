import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { User } from '@/users/entites/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    const newUser: User = new User(dto.username, dto.password, Date.now());
    this.usersService.createUser(newUser);
  }

  async signIn(dto: SignInDto): Promise<any> {
    const user = await this.usersService.findUser(dto.username);

    if (user?.password !== dto.password) {
      throw new UnauthorizedException();
    }
    // const { password, ...result } = user;
    const payload = { sub: user.id, username: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }
}
