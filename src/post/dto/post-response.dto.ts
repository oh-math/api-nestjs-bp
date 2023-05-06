import { Expose, Transform } from 'class-transformer';

export class PostResponseDto {
  @Expose()
  id: string;

  @Expose()
  slug: string;

  @Expose()
  title: string;

  @Expose()
  body: string;

  @Expose()
  @Transform(() => 'ai')
  image?: string | null;

  @Expose()
  authorId: string;
}
