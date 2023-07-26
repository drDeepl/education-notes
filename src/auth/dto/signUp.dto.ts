import { ApiProperty } from '@nestjs/swagger';
export class SignUpDto {
  @ApiProperty({ description: 'Users username', nullable: false })
  username: string;
  @ApiProperty({ description: 'Users password', nullable: false })
  password: string;
}
