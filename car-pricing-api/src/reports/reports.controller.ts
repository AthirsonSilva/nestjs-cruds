import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from '@src/interceptors/serialize.interceptor';
import { AdminGuard } from '@src/users/guards/admin.guard';
import { AuthGuard } from '@src/users/guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { DefaultReportDto } from './dtos/default-report.dto';
import { GetEstimateDto } from './get-estimate.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.getEstimate(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(DefaultReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: UserEntity) {
    return this.reportsService.create(body, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, AdminGuard)
  approveReport(@Param('id') id: string, @Body('approved') approved: boolean) {
    if (typeof approved !== 'boolean')
      throw new BadRequestException('A valid approved status must be provided');

    return this.reportsService.changeApproval(id, approved);
  }
}
