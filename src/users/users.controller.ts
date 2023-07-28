import {
  Controller,
  Get,
  Logger,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  UseGuards,
  HttpException,
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
import { Role } from '@prisma/client';
import { RoleDto } from './dto/role.dto';
import { RoleEntity } from './entites/role.entity';

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

  @Get('user/:userId')
  @ApiOperation({ summary: 'get user by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found user' })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  findUserById(@Param('userId') userId: number): Promise<User> {
    this.logger.verbose('findUserById');
    return this.usersService.findById(userId);
  }

  @Delete('user/:userId')
  @ApiOperation({ summary: 'get user by id' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found user' })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  deleteUser(@Param('userId') userId: string) {
    this.logger.verbose('deleteUser');
    return this.usersService.deleteUser(Number(userId));
  }

  @Get('roles/names')
  @ApiOperation({ summary: 'get roles of users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findAllRoles(): Promise<string[]> {
    this.logger.verbose('findAllRoles');
    return this.usersService.findRoles();
  }

  @Post('roles/add')
  @ApiOperation({ summary: 'add role' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: RoleEntity,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  addRole(@Body() dto: RoleDto): Promise<RoleEntity> {
    this.logger.verbose('addRole');
    return this.usersService.addRole(dto.role.toUpperCase());
  }
}
