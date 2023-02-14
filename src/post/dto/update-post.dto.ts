import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 150)
  @IsOptional()
  title?: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 500)
  @IsOptional()
  body?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  authorId?: string;
}
