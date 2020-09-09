import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class NoteParamsDto {
  @Transform((value) => Number.parseInt(value, 10))
  @ApiProperty({ description: 'Идентификатор заметки' })
  @IsInt()
  public noteId: number
}
