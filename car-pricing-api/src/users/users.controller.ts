import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { DefaultUserDto } from './dtos/default-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@Serialize(DefaultUserDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  WhoAmI(@CurrentUser() user: UserEntity) {
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color;
  }

  @Get('/colors')
  getColor(@Session() session: any) {
    return session.color;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body);

    session.userId = user.id;

    return user;
  }

  @Post('/signin')
  async UserSignIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body);

    session.userId = user.id;

    return user;
  }

  @Get('/:id')
  findUser(@Param('id') id: number) {
    if (!id) {
      throw new BadRequestException('You must provide an id');
    }

    return this.usersService.findOne(id);
  }

  @Get()
  findUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    if (!id) {
      throw new BadRequestException('You must provide an id');
    }

    return this.usersService.update(id, body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: number) {
    if (!id) {
      throw new BadRequestException('You must provide an id');
    }

    return this.usersService.remove(id);
  }
}
