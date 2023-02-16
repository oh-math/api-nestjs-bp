import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 150)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 500)
  body: string;

  @IsNotEmpty()
  @IsString()
  authorId: string;
}
