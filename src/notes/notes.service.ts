import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { NoteRequestDto } from './dto/note.request.dto';
import { NoteResponseDto } from './dto/note.response.dto';
import { NoteEntity } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
  ) {}

  public async findAll(): Promise<NoteResponseDto[]> {
    const notes = await this.noteRepository.find();
    return plainToClass(NoteResponseDto, notes);
  }

  public async find(noteId: number): Promise<NoteResponseDto> {
    const note = await this.noteRepository.findOne(noteId);

    if (!note) {
      throw new NotFoundException(`Note with id = ${noteId} not found`);
    }

    return plainToClass(NoteResponseDto, note);
  }

  public async create(note: NoteRequestDto): Promise<NoteResponseDto> {
    const result = await this.noteRepository.insert(note);
    const newNote = await this.noteRepository.findOne(result.identifiers[0]);
    return plainToClass(NoteResponseDto, newNote);
  }

  public async update(
    noteId: number,
    noteData: NoteRequestDto,
  ): Promise <void> {
    const note = await this.noteRepository.findOne(noteId);

    if (!note) {
      throw new NotFoundException(`Note with id = ${noteId} not found`);
    }

    await this.noteRepository.update(noteId, noteData);
  }

  public async delete(noteId: number): Promise <void> {
    const note = await this.noteRepository.findOne(noteId);

    if (!note) {
      throw new NotFoundException(`Note with id = ${noteId} not found`);
    }

    await this.noteRepository.remove(note);
  }
}
