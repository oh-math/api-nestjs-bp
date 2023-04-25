import { faker } from '@faker-js/faker';
import { CreateUserDto } from 'src/user/dto';

const fistName: string = faker.name.firstName();
const email: string = faker.internet.email(fistName);
const password: string = faker.internet.password(20, true);

function createUserFake(fields?: Partial<CreateUserDto>): CreateUserDto {
  return {
    name: faker.name.fullName({ firstName: fistName }),
    email,
    password,

    ...fields,
  };
}

export { createUserFake, fistName, email, password };
