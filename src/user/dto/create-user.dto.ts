import { Address } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
  IsObject,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 150)
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsObject()
  @IsOptional()
  address: Address;
}
