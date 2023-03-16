import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma-service';
import { PostResponseDto, UpdatePostDto } from './dto';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(input: CreatePostDto): Promise<PostResponseDto> {
    const result = await this.prisma.post.create({
      data: {
        slug: 'posts',
        ...input,
      },
    });

    return plainToInstance(PostResponseDto, result);
  }

  public async findAll(): Promise<PostResponseDto[]> {
    const result = await this.prisma.post.findMany();

    return plainToInstance(PostResponseDto, result);
  }

  public async findOne(id: string): Promise<PostResponseDto> {
    const result = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });

    return plainToInstance(PostResponseDto, result);
  }

  public async delete(id: string): Promise<object> {
    await this.prisma.post.delete({
      where: {
        id,
      },
    });

    return { id };
  }

  public async update(
    id: string,
    input: UpdatePostDto,
  ): Promise<PostResponseDto> {
    const result = await this.prisma.post.update({
      where: {
        id,
      },
      data: input,
    });

    return plainToInstance(PostResponseDto, result);
  }
}
