import {
  Controller,
  Get,
  Logger,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { User } from './entites/user.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Users')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger('USERS.CONTROLLER');

  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: [User] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findAll(): Promise<User[]> {
    this.logger.verbose('users.controller: users findAll');
    return this.usersService.findUsers();
  }
}
