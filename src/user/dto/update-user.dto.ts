import {
  IsNotEmpty,
  IsString,
  Length,
  IsObject,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 150)
  @IsOptional()
  name?: string;
}
