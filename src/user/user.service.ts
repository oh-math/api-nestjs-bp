import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma';
import { CreateUserDto, UpdateUserDto, UserResponse } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async count(options?: Prisma.UserCountArgs): Promise<Number> {
    return await this.prisma.user.count(options);
  }

  public async create(input: CreateUserDto): Promise<UserResponse> {
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

  public async findOne(id: string): Promise<UserResponse> {
    const result = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return plainToInstance(UserResponse, result);
  }

  public async delete(id: string): Promise<object> {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });

    return { id };
  }

  public async update(id: string, input: UpdateUserDto): Promise<UserResponse> {
    const result = await this.prisma.user.update({
      where: {
        id,
      },
      data: { ...input },
    });

    return plainToInstance(UserResponse, result);
  }
}
