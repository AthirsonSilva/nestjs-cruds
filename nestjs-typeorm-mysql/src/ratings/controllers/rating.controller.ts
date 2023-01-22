import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { response } from 'express';
import { Rating } from '../entities/rating.entity';
import { RatingService } from '../services/rating.service';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async createRating(@Res() response, @Body() rating: Rating) {
    const newRating = await this.ratingService.createRating(rating);
    return response.status(HttpStatus.CREATED).json({
      newRating,
      message: 'Rating created successfully',
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const ratings = await this.ratingService.findAll();
    return response.status(HttpStatus.OK).json({
      ratings: ratings,
      message: 'Ratings fetched successfully',
    });
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const rating = await this.ratingService.findOne(id);
    return response.status(HttpStatus.OK).json({
      rating,
      message: 'Rating fetched successfully',
    });
  }

  @Delete('/:id')
  async deleteRating(@Res() response, @Param('id') id) {
    const formerRating = await this.ratingService.deleteRating(id);

    return response.status(HttpStatus.OK).json({
      formerRating,
      message: 'Rating deleted successfully',
    });
  }

  @Put('/:id')
  async updateRating(@Res() response, @Param('id') id) {
    const rating = await this.ratingService.findOne(id);
    const updatedRating = await this.ratingService.updateRating(id, rating);

    return response.status(HttpStatus.OK).json({
      updatedRating,
      message: 'Rating updated successfully',
    });
  }

  @Delete()
  async deleteAll(@Res() response) {
    const formerRatings = await this.ratingService.deleteAll();

    return response.status(HttpStatus.OK).json({
      formerRatings,
      message: 'All ratings deleted successfully',
    });
  }
}
