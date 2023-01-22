import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dtos/auth-crendetials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserEntity } from './user.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    try {
      const { username, password } = authCredentialsDto;
      const salt = await genSalt();
      const hashedPassword = await hash(password, salt);

      const user = this.usersRepository.create({
        password: hashedPassword,
        username,
      });

      await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      }

      throw new InternalServerErrorException();
    }
  }

  public async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
    accessToken: string;
  }> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ where: { username } });

    if (user && (await compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const acessToken = await this.jwtService.sign(payload);

      return { accessToken: acessToken };
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
