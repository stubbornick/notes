import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class NoteResponseDto {
  @Expose()
  public id: number;

  @Expose()
  public title: string;

  @Expose()
  public text: string;

  @Expose()
  public updatedAt: Date;

  @Expose()
  public createdAt: Date;
}
