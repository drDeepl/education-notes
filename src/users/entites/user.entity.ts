import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ nullable: false })
  id: number;
  @ApiProperty({ nullable: false })
  username: string;
  @ApiProperty({ nullable: false })
  role: string;
  @ApiProperty({ nullable: false })
  passwordHash: string;
  @ApiProperty({ nullable: false })
  createdAt: Date;
  @ApiProperty({ nullable: false })
  refreshTokenHash: string;

  constructor(
    username: string,
    passwordHash: string,
    createdAt: Date,
    role: string = 'user',
    refreshTokenHash: string = '',
  ) {
    this.username = username;
    this.passwordHash = passwordHash;
    this.createdAt = createdAt;
    this.role = role;
    this.refreshTokenHash = refreshTokenHash;
  }
}
