import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingController } from './controllers/rating.controller';

import { Rating } from './entities/rating.entity';
import { RatingService } from './services/rating.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rating])],
  providers: [RatingService],
  controllers: [RatingController],
})
export class RatingModule {}
