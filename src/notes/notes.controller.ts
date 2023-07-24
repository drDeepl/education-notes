import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
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
@ApiSecurity('X-API-KEY', ['X-API-KEY']) // INFO: <<< авторизация через swagger
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('create')
  @UseGuards(AuthGuard('api-key')) // INFO: Если не авторизован, то вернет 401
  @ApiOperation({ summary: 'Creates a new note for the user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Note })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  @UseGuards(AuthGuard('api-key'))
  @ApiOperation({ summary: 'get all notes of all users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Note })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':noteId')
  @UseGuards(AuthGuard('api-key'))
  @ApiOperation({ summary: 'get note of user' })
  @ApiParam({ name: 'noteId', required: true, description: 'Note identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Note })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  findOne(@Param('noteId') id: string) {
    return this.notesService.findOne(+id);
  }

  @Patch(':noteId')
  @UseGuards(AuthGuard('api-key'))
  @ApiOperation({ summary: 'update note of user' })
  @ApiParam({ name: 'noteId', required: true, description: 'Note identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Note })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  update(@Param('noteId') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete(':noteId')
  @UseGuards(AuthGuard('api-key'))
  @ApiOperation({ summary: 'delete note of user' })
  @ApiParam({ name: 'noteId', required: true, description: 'Note identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Note })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  remove(@Param('noteId') id: string) {
    return this.notesService.remove(+id);
  }
}