import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { UserService } from 'src/user';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, UserService],
})
export class PostModule {}
