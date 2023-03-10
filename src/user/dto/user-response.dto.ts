import { Address } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class UserResponse {
  @Expose()
  id!: string;
  @Expose()
  email!: string;
  @Expose()
  name!: string;
  @Exclude()
  password!: string;
  @Expose()
  address!: Address;
}
