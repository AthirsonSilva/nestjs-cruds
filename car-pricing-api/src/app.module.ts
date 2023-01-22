import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsModule } from './reports/reports.module';
import { AuthService } from './users/auth.service';
import { UsersModule } from './users/users.module';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database:
        process.env.NODE_ENV === 'test' ? 'test.sqlite' : 'car_pricing.sqlite',
      entities: [
        __dirname +
          `/**/*.entity${process.env.NODE_ENV === 'test' ? '.ts' : '.js'}`,
      ],
      synchronize: false,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [
    AuthService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get<string>('COOKIE_SECRET')],
        }),
      )
      .forRoutes('*');
  }
}
