import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Rating } from '../entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
  ) {}

  findAll(): Promise<Rating[]> {
    return this.ratingRepository.find();
  }

  findOne(id: number): Promise<Rating> {
    return this.ratingRepository.findOne(id);
  }

  createRating(rating: Rating): Promise<Rating> {
    return this.ratingRepository.save(rating);
  }

  deleteRating(id: number): Promise<DeleteResult> {
    return this.ratingRepository.delete(id);
  }

  updateRating(id: number, rating: Rating): Promise<Rating> {
    this.ratingRepository.update(id, rating);
    return this.ratingRepository.findOne(id);
  }

  deleteAll(): Promise<DeleteResult> {
    return this.ratingRepository.delete({});
  }
}
