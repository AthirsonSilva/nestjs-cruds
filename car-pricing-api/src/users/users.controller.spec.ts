import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'email@email.com',
          password: 'password',
        } as UserEntity);
      },
      find: (email: string) => {
        return Promise.resolve([
          {
            id: 1,
            email,
            password: 'password',
          },
        ] as Array<UserEntity>);
      },
      remove: () => {
        return Promise.resolve(undefined as unknown as UserEntity);
      },
      /* update: (body: UpdateUserDto) => {
        const user = {
          id: 1,
          email: 'old@email.com',
          password: 'password',
        };

        Object.assign(user, body);

        return Promise.resolve(user);
      }, */
    };
    fakeAuthService = {
      // signup: () => {},
      signin: (body: CreateUserDto) => {
        return Promise.resolve({
          id: 1,
          email: body.email,
          password: 'password',
        } as UserEntity);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  test('it should return a list of users with the given email', async () => {
    const users = await controller.findUsers('email@email.com');

    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('email@email.com');
  });

  test('it should return a single user with the given id', async () => {
    const user = await controller.findUser(1);

    expect(user).toBeDefined();
  });

  test('it should throw a error if no id is provided', async () => {
    fakeUsersService.findOne = () => null;

    expect(controller.findUser(99)).toBeNull();
  });

  test('it should signin user, update session object and return user', async () => {
    const session = { userId: -10 };

    const user = await controller.UserSignIn(
      {
        email: 'email@email.com',
        password: 'password',
      },
      session,
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
