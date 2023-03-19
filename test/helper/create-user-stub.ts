import { faker } from '@faker-js/faker';
import { CreateUserDto } from 'src/user/dto';

export const fistName: string = faker.name.firstName();
export const email: string = faker.internet.email(fistName);
export const password: string = faker.internet.password(20, true);

export function createFakeUser(fields?: Partial<CreateUserDto>): CreateUserDto {
  return {
    name: faker.name.fullName({ firstName: fistName }),
    email,
    password,

    ...fields,
  };
}
