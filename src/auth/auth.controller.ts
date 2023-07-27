import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { UserDto } from '@/users/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Tokens } from './types';
import { TokensDto } from './dto/tokens.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiOperation({ summary: 'response to validate data for sign in' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: UserDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  signIn(@Body() dto: SignInDto): Promise<Tokens> {
    return this.authService.signIn(dto);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'response to validate data for sign up' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
    type: TokensDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  signUp(@Body() dto: SignUpDto): Promise<Tokens> {
    return this.authService.signUp(dto);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @ApiOperation({ summary: 'response to update access token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: UserDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  refresh() {
    return true;
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @ApiOperation({ summary: 'response to clear refreshTokenHash' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  logout(@Req() req: Request) {
    const user = req.user;
    this.authService.logout(user['sub']);
  }
}
