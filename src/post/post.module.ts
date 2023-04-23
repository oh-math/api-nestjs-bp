import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { UserService } from 'src/user';
import { PostService, PostController } from 'src/post';
import { S3Module } from 'src/s3';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, UserService],
  imports: [S3Module],
})
export class PostModule {}
