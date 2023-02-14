import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePostDto, PostResponseDto, UpdatePostDto } from './dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  public async create(@Body() input: CreatePostDto): Promise<PostResponseDto> {
    return await this.postService.create(input);
  }

  @Get()
  public async findAll(): Promise<PostResponseDto[]> {
    return await this.postService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<PostResponseDto> {
    return await this.postService.findOne(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<Object> {
    return await this.postService.delete(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() input: UpdatePostDto,
  ): Promise<PostResponseDto> {
    return await this.postService.update(id, input);
  }
}