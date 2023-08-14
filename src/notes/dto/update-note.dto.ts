import { ApiProperty } from '@nestjs/swagger';
export class UpdateNoteDto {
  @ApiProperty({ nullable: false })
  name: string;
  @ApiProperty({ nullable: false })
  description: string;
  @ApiProperty({ nullable: false })
  content: string;
  @ApiProperty({ nullable: false, default: false })
  published: boolean;
  @ApiProperty({ nullable: false, default: false })
  isFavorite: boolean;
  @ApiProperty({ nullable: false })
  authorId: number;
}
