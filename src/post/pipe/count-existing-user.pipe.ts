import {
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import * as Joi from 'joi';
import { UserRepository } from 'src/user/user.repository';
import { CreatePostDto } from '../dto';

@Injectable()
export class CountExistingUserPipe implements PipeTransform {
  constructor(private readonly userRepository: UserRepository) {}

  async transform(value: CreatePostDto): Promise<CreatePostDto> {
    const { authorId: id } = value;

    const userCount = await this.userRepository.count({
      where: {
        id: parseInt(id),
      },
    });

    Joi.assert(
      userCount,
      Joi.number().min(1).max(1),
      new BadRequestException({
        error: HttpStatus.BAD_REQUEST,
        message: `Given user don't exists`,
      }),
    );

    return value;
  }
}
