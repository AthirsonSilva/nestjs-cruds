import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('it handles a signup request', async () => {
    const email = faker.internet.email();

    return request(app.getHttpServer())
      .post('/users/signup')
      .send({
        email: email,
        password: '123456',
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.id).toBeDefined();
        expect(body.email).toEqual(email);
        expect(body.password).not.toBeDefined();
      });
  });

  test('it should sign up a new user then get the current logged user', async () => {
    const email = faker.internet.email();

    const signUpResponse = await request(app.getHttpServer())
      .post('/users/signup')
      .send({
        email: email,
        password: '123456',
      });
    const userCookie = signUpResponse.get('Set-Cookie');
    await request(app.getHttpServer())
      .get('/users/me')
      .set('Cookie', userCookie)
      .expect(200)
      .then(({ body }) => {
        expect(body.id).toBeDefined();
        expect(body.email).toEqual(email);
        expect(body.password).not.toBeDefined();
      });
  });
});
