import { Address } from '@prisma/client';
import { Expose } from 'class-transformer';


export class UserResponse {
  @Expose()
  id: string;
  @Expose()
  email: string;
  @Expose()
  name: string;
  @Expose()
  address: Address;
}
