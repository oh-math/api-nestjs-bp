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
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserResponse } from './dto';
import { CountNamePipe } from './pipe';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(CountNamePipe)
  @Post()
  public async create(@Body() input: CreateUserDto): Promise<UserResponse> {
    return await this.userService.create(input);
  }

  @Get()
  public async findAll(): Promise<UserResponse[]> {
    return await this.userService.findAll();
  }

  @Get('byIdOrEmail/:input')
  public async findByIdOrEmail(
    @Param('input') input: string,
  ): Promise<UserResponse> {
    return await this.userService.findByIdOrEmail(input);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.userService.delete(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() input: UpdateUserDto,
  ): Promise<UserResponse> {
    return await this.userService.update(id, input);
  }
}
