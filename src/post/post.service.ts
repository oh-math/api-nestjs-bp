import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { formatDate } from 'src/helper/date';
import { PrismaService } from 'src/prisma';
import { S3Service } from 'src/s3';
import { CreatePostDto, PostResponseDto, UpdatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly S3Service: S3Service,
  ) {}

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

  public async delete(id: string) {
    await this.prisma.post.delete({
      where: {
        id,
      },
    });
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

  public async addFileToPost(file: Express.Multer.File, id: string) {
    const key = `${formatDate(new Date())}_${file.originalname}`;
    const { url } = await this.S3Service.uploadFile(file, key);

    await this.prisma.post.update({
      where: {
        id,
      },
      data: {
        image: url,
      },
    });
  }
}
