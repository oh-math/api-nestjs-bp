import { Address } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
  IsObject,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 150)
  @IsOptional()
  name?: string;

  @IsObject()
  @IsOptional()
  address?: Address;
}
