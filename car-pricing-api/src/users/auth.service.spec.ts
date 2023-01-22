import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: Array<UserEntity> = new Array<UserEntity>();
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);

        return Promise.resolve(filteredUsers);
      },
      create: (body: CreateUserDto) => {
        const user = {
          id: Math.floor(Math.random() * 99999),
          ...body,
        } as UserEntity;

        users.push(user);

        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  test('it can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  test('it creates a new user with a salted and hased password', async () => {
    const user = await service.signup({
      email: 'poggers@yahoo.com',
      password: '123456',
    });

    const [salt, hash] = user.password.split('.');

    expect(user.password).not.toEqual('123456');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  test('it throws an error if user signs up with email that is in use', async () => {
    await service.signup({
      email: 'already@exists.com',
      password: 'rightpassword',
    });

    await expect(
      service.signup({
        email: 'already@exists.com',
        password: '123456',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  test('it throws if signin is called with an unused email', async () => {
    await expect(
      service.signin({
        email: 'not@exists.com',
        password: '123456',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  test('it returns a user if correct password is provided', async () => {
    await service.signup({
      email: 'email@email.com',
      password: 'rightpassword',
    });

    await expect(
      service.signin({ email: 'email@email.com', password: 'rightpassword' }),
    ).resolves.not.toThrow();
  });

  test('it throws if an invalid password is provided', async () => {
    await service.signup({
      email: 'email@email.com',
      password: 'rightpassword',
    });

    await expect(
      service.signin({ email: 'email@email.com', password: 'wrongpassword' }),
    ).rejects.toThrow(BadRequestException);
  });
});
