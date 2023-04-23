import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { PrismaService } from 'src/prisma';
import { CreateUserDto, UpdateUserDto, UserResponse } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async count(options: Prisma.UserCountArgs): Promise<number> {
    return this.prisma.user.count(options);
  }

  public async create(input: CreateUserDto) {
    input.password = hashSync(input.password, 10);

    const result = await this.prisma.user.create({
      data: input,
    });

    return plainToInstance(UserResponse, result);
  }

  public async findAll(): Promise<UserResponse[]> {
    const result = await this.prisma.user.findMany({
      include: {
        posts: true,
      },
    });

    return plainToInstance(UserResponse, result);
  }

  public async findByIdOrEmail(input: string): Promise<UserResponse> {
    const result = await this.prisma.user.findFirst({
      where: {
        OR: [
          { id: ObjectId.isValid(input) ? input : undefined },
          { email: input },
        ],
      },
    });

    return plainToInstance(UserResponse, result);
  }

  public async findUnique(
    options: Prisma.UserFindUniqueOrThrowArgs,
  ): Promise<User> {
    return this.prisma.user.findUniqueOrThrow(options);
  }

  public async delete(id: string) {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  public async update(id: string, input: UpdateUserDto) {
    const result = await this.prisma.user.update({
      where: {
        id,
      },
      data: { ...input },
    });

    return plainToInstance(UserResponse, result);
  }
}
