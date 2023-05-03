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
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { CreatePostDto, PostResponseDto, UpdatePostDto } from './dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import {
  CountExistingUserPipe,
  PostFromUserPipe,
  fileValidators,
} from './pipe';
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
  public async delete(@Param('id') id: string) {
    await this.postService.delete(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() input: UpdatePostDto,
  ): Promise<PostResponseDto> {
    return await this.postService.update(id, input);
  }

  @Post(':id/upload')
  @UsePipes(PostFromUserPipe)
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(
    @UploadedFile(fileValidators)
    file: Express.Multer.File,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    return await this.postService.addFileToPost(file, id);
  }
}
