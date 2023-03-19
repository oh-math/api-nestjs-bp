import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Address } from '@prisma/client';
import { AppModule } from 'src/app/app.module';
import { UserModule } from 'src/user';
import { CreateUserDto } from 'src/user/dto';
import * as request from 'supertest';
import { createUserFake, email } from 'test/helper/create-user-stub';

interface UserComingRequest {
  body: {
    id?: number;
    name: string;
    email: string;
    password: string;
    address?: Address;
  };
}

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('User CRUD ', () => {
    const userEmail: string = email;
    
    let user: UserComingRequest;
    let data: CreateUserDto;

    beforeAll(() => {
      data = createUserFake({ email: userEmail });
    });

    it('(POST) Should create User', async () => {
      await request(app.getHttpServer()).post('/users').send(data).expect(201);
    });

    it('(GET) should get User', async () => {
      user = await request(app.getHttpServer())
        .get(`/users/byIdOrEmail/${userEmail}`)
        .expect(200);

      expect(user.body).toMatchObject(
        expect.objectContaining({
          name: expect.any(String),
          email: expect.any(String),
        }),
      );
    });

    it('(DELETE) should delete User', async () => {
      const id = user.body.id;

      await request(app.getHttpServer()).delete(`/users/${id}`).expect(204);
    });
  });
});
