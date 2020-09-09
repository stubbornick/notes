import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { jwtConstants } from '../auth/constants';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NoteParamsDto } from './dto/note.params.dto';
import { NoteRequestDto } from './dto/note.request.dto';
import { NoteResponseDto } from './dto/note.response.dto';
import { NotesService } from './notes.service';

@Controller('notes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth(jwtConstants.authName)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  @ApiOperation({ summary: 'Получение всех заметок' })
  @ApiOkResponse({ type: NoteResponseDto, isArray: true })
  public findAll(): Promise<NoteResponseDto[]> {
    return this.notesService.findAll();
  }

  @Get(':noteId')
  @ApiOperation({ summary: 'Получение заметки по ID' })
  @ApiOkResponse({ type: NoteResponseDto })
  public find(@Param() param: NoteParamsDto): Promise<NoteResponseDto> {
    return this.notesService.find(param.noteId);
  }

  @Post()
  @ApiOperation({ summary: 'Создание новой заметки' })
  @ApiBody({ type: NoteRequestDto })
  @ApiResponse({ status: 201, type: NoteResponseDto })
  public create(@Body() note: NoteRequestDto): Promise<NoteResponseDto> {
    return this.notesService.create(note);
  }

  @Patch(':noteId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Редактирование заметки' })
  @ApiResponse({ status: 204, description: 'Заметка успешно отредактирована' })
  public update(
    @Param() params: NoteParamsDto,
    @Body() noteData: NoteRequestDto,
  ): Promise<void> {
    return this.notesService.update(params.noteId, noteData);
  }

  @Delete(':noteId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Удаление заметки' })
  @ApiResponse({ status: 204, description: 'Заметка успешно удалена' })
  public delete(@Param() params: NoteParamsDto): Promise<void> {
    return this.notesService.delete(params.noteId);
  }
}
