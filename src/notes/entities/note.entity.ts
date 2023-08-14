import { ApiProperty } from '@nestjs/swagger';
export class Note {
  @ApiProperty({ description: 'Note identifier', nullable: false })
  id: number;
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
  @ApiProperty({
    description: 'Note flag is favorite',
    nullable: false,
    default: false,
  })
  isFavorite: boolean;
  @ApiProperty({
    description: 'Note rating',
    nullable: false,
    default: 0.0,
  })
  rating: number;
  @ApiProperty({ description: 'Note description', nullable: false })
  description: string;

  constructor(
    id: number,
    name: string,
    content: string,
    authorId: number,
    published: boolean = false,
    isFavorite: boolean = false,
    rating: number = 0.0,
    description: string = '',
  ) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.authorId = authorId;
    this.published = published;
    this.isFavorite = isFavorite;
    this.rating = rating;
    this.description = description;
  }
}
