import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'User identifier', nullable: false })
  id: number;
  @ApiProperty({ description: 'Users username', nullable: false })
  username: string;
  @ApiProperty({ description: 'Users password', nullable: false })
  password: string;
  @ApiProperty({ description: 'User data of register', nullable: false })
  datetimeSignUp: number;
  @ApiProperty({ description: 'Users role', nullable: false })
  role: string;

  constructor(
    username: string,
    password: string,
    datetimeSignUp: number,
    role: string = 'user',
    id: number = 0,
  ) {
    this.username = username;
    this.password = password;
    this.datetimeSignUp = datetimeSignUp;
    this.role = role;
    this.id = id;
  }
}
