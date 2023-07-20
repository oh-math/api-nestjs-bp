import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { formatDate } from 'src/helper/date';
import { PrismaService } from 'src/prisma';
import { S3Service } from 'src/s3';
import { CreatePostDto, PostResponseDto, UpdatePostDto } from './dto';
import { randomUUID } from 'crypto';
import { extname } from 'path';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly S3Service: S3Service,
  ) {}

  public async create(input: CreatePostDto): Promise<PostResponseDto> {
    const result = await this.prisma.client.post.create({
      data: {
        ...input,
        authorId: parseInt(input.authorId),
      },
    });
    return plainToInstance(PostResponseDto, result);
  }

  public async findAll(): Promise<PostResponseDto[]> {
    const result = await this.prisma.client.post.findMany();

    return plainToInstance(PostResponseDto, result);
  }

  public async findOne(id: string): Promise<PostResponseDto> {
    const result = await this.prisma.client.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return plainToInstance(PostResponseDto, result);
  }

  public async delete(id: string) {
    await this.prisma.client.post.delete({
      where: {
        id: parseInt(id),
      },
    });
  }

  public async update(
    id: string,
    input: UpdatePostDto,
  ): Promise<PostResponseDto> {
    const result = await this.prisma.client.post.update({
      where: {
        id: parseInt(id),
      },
      data: input,
    });

    return plainToInstance(PostResponseDto, result);
  }

  public async addFileToPost(file: Express.Multer.File, id: string) {
    const fileExtension = extname(file.originalname);
    //  previous way: file.originalname.split('.').pop();

    const key = `${randomUUID()}-${formatDate(new Date())}${fileExtension}`;
    const { url } = await this.S3Service.uploadFile(file, key);

    await this.prisma.client.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        image: url,
      },
    });
  }
}
