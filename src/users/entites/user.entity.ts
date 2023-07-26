import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'User identifier', nullable: false })
  id: number;
  @ApiProperty({ description: 'Users username', nullable: false })
  username: string;
  @ApiProperty({ description: 'Users password', nullable: false })
  passwordHash: string;
  @ApiProperty({ description: 'User data of register', nullable: false })
  datetimeSignUp: number;
  @ApiProperty({ description: 'Users role', nullable: false })
  role: string;
  @ApiProperty({ description: 'Users refresh token hash', nullable: false })
  refreshTokenHash: string;

  constructor(
    username: string,
    passwordHash: string,
    datetimeSignUp: number,
    role: string = 'user',
    id: number = 0,
    refreshTokenHash: string = '',
  ) {
    this.username = username;
    this.passwordHash = passwordHash;
    this.datetimeSignUp = datetimeSignUp;
    this.role = role;
    this.id = id;
    this.refreshTokenHash = refreshTokenHash;
  }
}
