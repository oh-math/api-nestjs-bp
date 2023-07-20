import { Prisma, User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from '../dto';

export interface IUserRepository {
  count(options: Prisma.UserCountArgs): Promise<number>;
  create(input: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findFirst(options: Prisma.UserFindFirstOrThrowArgs): Promise<User | null>;
  findUnique(options: Prisma.UserFindUniqueOrThrowArgs): Promise<User>;
  delete(id: string): Promise<void>;
  update(id: string, input: UpdateUserDto): Promise<User>;
}
