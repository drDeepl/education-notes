import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'User identifier', nullable: false })
  id: number;
  @ApiProperty({ description: 'Users username', nullable: false })
  username: string;
  @ApiProperty({ description: 'Users password', nullable: false })
  password: string;
  @ApiProperty({ description: 'User data of register', nullable: false })
  datetimeRegister: string;
  @ApiProperty({ description: 'Users role', nullable: false })
  role: string;
}
