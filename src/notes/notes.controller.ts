import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

import { Note } from './entities/note.entity';

@ApiTags('Notes')
@Controller('notes')
@UseGuards(AuthGuard('jwt'))
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('note/create')
  @ApiOperation({ summary: 'Creates a new note for the user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Note })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'get all notes of all users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Note })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findAll() {
    return this.notesService.findAll();
  }

  @Get('note/:noteId')
  @ApiOperation({ summary: 'get note of user' })
  @ApiParam({ name: 'noteId', required: true, description: 'Note identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Note })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async findOne(@Param('noteId') noteId: string): Promise<Note> {
    return this.notesService.findNote(+noteId);
  }

  @Get('note/to-published/:noteId')
  @ApiOperation({ summary: 'to published note' })
  @ApiParam({ name: 'noteId', required: true, description: 'Note identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Note })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @HttpCode(HttpStatus.OK)
  toPublishedNote(@Param('noteId') noteId: string) {
    return this.notesService.toPublished(+noteId);
  }

  @Get('published')
  @ApiOperation({ summary: 'get notes is published' })
  @ApiParam({ name: 'noteId', required: true, description: 'Note identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Note })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findPublished() {
    return this.notesService.findPublished();
  }

  @Post('note/update/:noteId')
  @ApiOperation({ summary: 'update note of user' })
  @ApiParam({ name: 'noteId', required: true, description: 'Note identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Note })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Notes is not found',
  })
  async update(
    @Param('noteId') noteId: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.update(Number(noteId), updateNoteDto);
  }

  @Delete('note/delete/:noteId')
  @ApiOperation({ summary: 'delete note of user' })
  @ApiParam({ name: 'noteId', required: true, description: 'Note identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Note })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  remove(@Param('noteId') id: string): Promise<Note> {
    return this.notesService.remove(+id);
  }
}
