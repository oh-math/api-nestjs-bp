import {
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  PipeTransform,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import * as Joi from 'joi';
import { PrismaService } from 'src/prisma';

@Injectable({ scope: Scope.REQUEST })
export class PostFromUserPipe implements PipeTransform {
  constructor(
    @Inject(REQUEST) private readonly req: Request,
    private readonly prisma: PrismaService,
  ) {}

  async transform(argument: ArgumentMetadata): Promise<ArgumentMetadata> {
    const { id } = this.req.params;
    const { email } = this.req.user;

    const post = await this.prisma.client.post.findFirstOrThrow({
      where: {
        id: parseInt(id),
      },
      include: {
        author: true,
      },
    });

    Joi.assert(
      post.author.email,
      Joi.string().valid(email),
      new BadRequestException({
        error: HttpStatus.BAD_REQUEST,
        message: `Given post do not belongs you`,
      }),
    );

    return argument;
  }
}
