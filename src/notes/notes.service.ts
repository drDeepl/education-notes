import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { _getRandomInt } from '@/app.utils';
import { PrismaService } from '@/prisma/prisma.service';
import { Not } from 'typeorm';

@Injectable()
export class NotesService {
  private readonly logger = new Logger('NOTES.SERVICE');
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateNoteDto) {
    this.logger.verbose('create');
    const newNote = await this.prisma.note.create({
      data: {
        name: dto.name,
        content: dto.content,
        authorId: dto.authorId,
        published: dto.published,
        description: dto.description,
      },
    });
    return newNote;
  }

  async findAll() {
    this.logger.verbose('findAll');
    const notes = await this.prisma.note.findMany();
    return notes;
  }

  async findNote(noteId: number): Promise<Note> {
    this.logger.verbose('findNote');
    const note: Note = await this.prisma.note.findUnique({
      where: { id: noteId },
    });
    if (!note) throw new NotFoundException('Note is not found');
    return note;
  }

  async findPublished() {
    this.logger.verbose('findPublished');
    return await this.prisma.note.findMany({ where: { published: true } });
  }

  async toPublished(noteId: number) {
    this.logger.verbose('toPublished');
    console.log(noteId);
    await this.prisma.note
      .update({
        where: { id: noteId },
        data: { published: true },
      })
      .catch((error) => {
        this.logger.error(error);
        if (error.code === 'P2025') {
          throw new NotFoundException('Note is not found');
        }
      });
  }

  async update(noteId: number, dto: UpdateNoteDto) {
    return await this.prisma.note
      .update({
        where: { id: noteId },
        data: {
          name: dto.name,
          description: dto.description,
          content: dto.content,
          published: dto.published,
          authorId: dto.authorId,
        },
      })
      .catch((error) => {
        this.logger.error(error.code);
        if (error.code === 'P2003') {
          throw new NotFoundException('Author is not found');
        }
        if (error.code === 'P2025') {
          throw new NotFoundException('Note is not found');
        }
      });
  }

  async remove(noteId: number): Promise<Note> {
    return this.prisma.note.delete({ where: { id: noteId } });
  }
}
