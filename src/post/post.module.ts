import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { UserService } from 'src/user';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { S3Module } from 'src/s3/s3.module';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, UserService],
  imports: [S3Module]
})
export class PostModule {}
