import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma';
import { CreateUserDto, UpdateUserDto } from './dto';
import { IUserRepository } from './interfaces/user-repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async count(options: Prisma.UserCountArgs): Promise<number> {
    return this.prisma.client.user.count(options);
  }
  public async create(input: CreateUserDto): Promise<User> {
    return await this.prisma.client.user.create({
      data: input,
    });
  }

  public async findAll(): Promise<User[]> {
    return await this.prisma.client.user.findMany();
  }
  public async findByIdOrEmail(input: string): Promise<User | null> {
    return await this.prisma.extended.user.findByIdOrEmail(input);
  }

  public async findUnique(
    options: Prisma.UserFindUniqueOrThrowArgs,
  ): Promise<User> {
    return this.prisma.client.user.findUniqueOrThrow(options);
  }
  public async delete(id: string): Promise<void> {
    await this.prisma.client.user.delete({
      where: {
        id: parseInt(id),
      },
    });
  }

  public async update(id: string, input: UpdateUserDto): Promise<User> {
    return await this.prisma.client.user.update({
      where: {
        id: parseInt(id),
      },
      data: { ...input },
    });
  }
}
