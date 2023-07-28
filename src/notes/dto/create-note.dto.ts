import { ApiProperty } from '@nestjs/swagger';
export class CreateNoteDto {
  @ApiProperty({ description: 'Note name', nullable: false })
  name: string;
  @ApiProperty({ description: 'Note content', nullable: false })
  content: string;
  @ApiProperty({ description: 'Note author', nullable: false })
  authorId: number;
  @ApiProperty({
    description: 'Note flag to published',
    nullable: false,
    default: false,
  })
  published: boolean;
  @ApiProperty({ description: 'Note description', nullable: false })
  description: string;
}
