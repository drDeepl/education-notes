import { ApiProperty } from '@nestjs/swagger';
export class Note {
  @ApiProperty({ description: 'Note identifier', nullable: false })
  id: number;
  @ApiProperty({ description: 'Note name', nullable: false })
  name: string;
  @ApiProperty({ description: 'Note content', nullable: false })
  content: string;
  @ApiProperty({ description: 'Note author', nullable: false })
  author: number;
  @ApiProperty({ description: 'Note flag to published', nullable: false })
  isPublished: boolean;
  @ApiProperty({ description: 'Note description', nullable: false })
  description: string;

  constructor(
    id: number,
    name: string,
    content: string,
    author: number,
    isPublished: boolean = false,
    description: string = '',
  ) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.author = author;
    this.isPublished = isPublished;
    this.description = description;
  }
}
