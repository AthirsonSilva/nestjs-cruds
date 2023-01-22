import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  create(body: CreateUserDto) {
    const user = this.userRepository.create(body);

    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<UserEntity> {
    if (!id) {
      throw new BadRequestException('You must provide an id');
    }

    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async find(email?: string): Promise<UserEntity[]> {
    const users = email
      ? await this.userRepository.find({ where: { email } })
      : await this.userRepository.find();

    return users;
  }

  async update(id: number, body: UpdateUserDto) {
    const user = await this.findOne(id);

    Object.assign(user, body);

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    return this.userRepository.remove(user);
  }
}
