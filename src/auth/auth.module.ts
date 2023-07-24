import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport/dist';
import { ApiKeyStrategy } from './api-key.strategy';
import { UsersModule } from '@/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
@Module({
  imports: [PassportModule, ConfigModule, UsersModule],
  providers: [ApiKeyStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
