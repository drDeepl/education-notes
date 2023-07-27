import { ApiProperty } from '@nestjs/swagger';

export class User {
  id: number;
  @ApiProperty({ description: 'Users username', nullable: false })
  username: string;
  @ApiProperty({ description: 'Users role', nullable: false })
  role: string;
  @ApiProperty({ description: 'Users password', nullable: false })
  passwordHash: string;
  @ApiProperty({ description: 'User data of register', nullable: false })
  createdAt: number;
  @ApiProperty({ description: 'Users refresh token hash', nullable: false })
  refreshTokenHash: string;

  constructor(
    username: string,
    passwordHash: string,
    datetimeSignUp: number,
    role: string = 'user',
    refreshTokenHash: string = '',
  ) {
    this.username = username;
    this.passwordHash = passwordHash;
    this.createdAt = datetimeSignUp;
    this.role = role;
    this.refreshTokenHash = refreshTokenHash;
  }
}
