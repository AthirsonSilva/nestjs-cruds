import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dtos/auth-crendetials.dto';
import { UserEntity } from './user.entity';

@EntityRepository()
@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  public async createUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    const user = this.create(authCredentialsDto);
    await this.save(user);
  }
}
