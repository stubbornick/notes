import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

const noteTitleMaxLength = 100;

export class NoteRequestDto {
  @ApiProperty({
    description: 'Название заметки',
    maxLength: noteTitleMaxLength,
  })
  @IsString()
  @MaxLength(noteTitleMaxLength)
  public title: string

  @ApiProperty({ description: 'Текст заметки' })
  @IsString()
  public text: string
}
