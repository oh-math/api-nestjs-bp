import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PostController, PostService } from 'src/post';
import { PrismaService } from 'src/prisma';
import { S3Module } from 'src/s3';
import { UserRepository } from 'src/user/user.repository';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, PrismaClient, UserRepository],
  imports: [S3Module],
})
export class PostModule {}
