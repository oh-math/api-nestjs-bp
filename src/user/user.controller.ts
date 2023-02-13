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
import { CreateUserDto, UpdateUserDto, UserResponse } from './dto';
import { UserService } from './user.service';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() input: CreateUserDto) {
    return await this.userService.create(input);
  }

  @Get()
  public async findAll(): Promise<UserResponse[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<UserResponse> {
    return await this.userService.findOne(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<Object> {
    return await this.userService.delete(id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, input: UpdateUserDto) {
    return await this.userService.update(id, input);
  }
}
