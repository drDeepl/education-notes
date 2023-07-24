import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { _getRandomInt } from 'src/app.utils';

@Injectable()
export class NotesService {
  private _notes: Note[] = [];

  create(createNoteDto: CreateNoteDto) {
    const id: number = _getRandomInt();
    const note: Note = new Note(
      id,
      createNoteDto.name,
      createNoteDto.content,
      createNoteDto.author,
      createNoteDto.isPublished,
      createNoteDto.description,
    );
    this._notes.push(note);
    return note;
  }

  findAll() {
    return this._notes;
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }

  // private _getRandomInt(): number {
  //   return Math.floor(Math.random() * 100);
  // }
}
