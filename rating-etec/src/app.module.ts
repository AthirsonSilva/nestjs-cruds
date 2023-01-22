import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './ratings/entities/rating.entity';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '' || '@Potter4',
      database: 'dbratings',
      entities: [Rating],
      synchronize: true,
    }),
    RatingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
