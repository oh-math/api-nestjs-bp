import { Expose } from 'class-transformer';

export class PostResponseDto {
  @Expose()
  id: string;


  @Expose()
  title: string;

  @Expose()
  body: string;

  @Expose()
  authorId: string;
}
