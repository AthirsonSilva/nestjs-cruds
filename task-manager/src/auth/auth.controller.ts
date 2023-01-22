import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dtos/auth-crendetials.dto';
import { JwtStrategy } from './jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtStrategy: JwtStrategy,
  ) {}

  @Post('/signup')
  public async signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return await this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  public async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{
    accessToken: string;
  }> {
    return await this.authService.signIn(authCredentialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  public async test(@Request() request): Promise<any> {
    console.log(request);
  }
}
