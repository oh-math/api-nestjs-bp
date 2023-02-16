import {
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import * as Joi from 'joi';
import { CreateUserDto } from '../dto';
import { UserService } from '../user.service';

@Injectable()
export class CountNamePipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  async transform(value: CreateUserDto): Promise<CreateUserDto> {
    const { name } = value;
    const nameCount = name
      ? await this.userService.count({
          where: {
            name,
          },
        })
      : 0;

    Joi.assert(
      nameCount,
      Joi.number().max(0),
      new BadRequestException({
        error: HttpStatus.BAD_REQUEST,
        message: 'Name already exists',
      }),
    );

    return value;
  }
}
