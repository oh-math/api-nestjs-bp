import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app/app.module';
import { PrismaService } from 'src/prisma';
import { UserService } from 'src/user';
import { CreateUserDto, UserResponse } from 'src/user/dto';
import * as request from 'supertest';
import { createUserFake, password } from 'test/helper/create-user-stub';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Login ', () => {
    // faker generated password
    const userPassword: string = password;

    let data: CreateUserDto;
    let user: UserResponse;

    beforeAll(async () => {
      data = createUserFake({ password: userPassword });

      prisma = new PrismaService();
      userService = new UserService(prisma);
      user = await userService.create(data);
    });

    afterAll(async () => {
      await userService.delete(user.id);
    });

    it('(POST) Should login a User', async () => {
      const { email } = data;

      const result = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email, password: userPassword })
        .expect(201);
    });
  });
});
