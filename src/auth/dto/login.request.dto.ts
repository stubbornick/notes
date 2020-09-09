import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ description: 'Логин', example: 'user' })
  @IsString()
  public username: string

  @ApiProperty({ description: 'Пароль', example: 'password' })
  @IsString()
  public password: string
}
