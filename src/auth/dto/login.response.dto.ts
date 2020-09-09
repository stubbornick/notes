import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoginResponseDto {
  @Expose()
  @ApiProperty({ description: 'JWT токен доступа' })
  public accessToken: string
}
