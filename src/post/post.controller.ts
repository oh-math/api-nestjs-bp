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
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreatePostDto, PostResponseDto, UpdatePostDto } from './dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { CountExistingUserPipe } from './pipe';
import { PostService } from './post.service';

@Controller('posts')
@UseGuards(JWTAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UsePipes(CountExistingUserPipe)
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
  public async delete(@Param('id') id: string): Promise<object> {
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
