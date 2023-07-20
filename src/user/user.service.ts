import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto, UpdateUserDto, UserResponse } from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async count(options: Prisma.UserCountArgs): Promise<number> {
    return await this.userRepository.count(options);
  }

  public async create(input: CreateUserDto) {
    input.password = hashSync(input.password, 10);

    const plainUser = await this.userRepository.create(input);

    return plainToInstance(UserResponse, plainUser);
  }

  public async findAll(): Promise<UserResponse[]> {
    const plainUser = await this.userRepository.findAll();

    return plainToInstance(UserResponse, plainUser);
  }

  public async findByIdOrEmail(input: string): Promise<UserResponse> {
    const plainUser = await this.userRepository.findFirst({
      where: {
        OR: [{ id: parseInt(input) }, { email: input }],
      },
    });

    return plainToInstance(UserResponse, plainUser);
  }

  public async delete(id: string) {
    await this.userRepository.delete(id);
  }

  public async update(id: string, input: UpdateUserDto) {
    const plainUser = await this.userRepository.update(id, input);

    return plainToInstance(UserResponse, plainUser);
  }
}
