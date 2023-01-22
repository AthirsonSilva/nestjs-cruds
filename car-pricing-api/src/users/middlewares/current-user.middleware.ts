import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserEntity } from '../user.entity';
import { UsersService } from './../users.service';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserEntity;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.session || {};

    if (!userId) {
      return next();
    }

    const user = await this.usersService.findOne(parseInt(userId));

    request.currentUser = user;

    next();
  }
}
