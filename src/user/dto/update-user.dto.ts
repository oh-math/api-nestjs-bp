import { Address } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
  IsObject,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 150)
  name?: string;

  @IsEmail()
  @IsString()
  email?: string;

  @IsObject()
  address?: Address;
}
