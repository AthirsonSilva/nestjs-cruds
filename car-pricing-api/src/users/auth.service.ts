import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(body: CreateUserDto) {
    const users = await this.usersService.find(body.email);

    if (users.length > 0) {
      throw new BadRequestException('Email already in use');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(body.password, salt, 32)) as Buffer;
    const hashedPassword = `${salt}.${hash.toString('hex')}`;

    return await this.usersService.create({
      ...body,
      password: hashedPassword,
    });
  }

  async signin(body: CreateUserDto) {
    const user = await this.validateUser(body);

    return user;
  }

  async validateUser(body: CreateUserDto) {
    const [user] = await this.usersService.find(body.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(body.password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid password');
    }

    return user;
  }
}
