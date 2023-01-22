import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './get-estimate.dto';
import { ReportEntity } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportEntity)
    private reportRepository: Repository<ReportEntity>,
  ) {}

  create(report: CreateReportDto, user: UserEntity) {
    const newReport = this.reportRepository.create({
      ...report,
      year: report.year.toString(),
    });

    newReport.user = user;

    return this.reportRepository.save(newReport);
  }

  getEstimate(report: GetEstimateDto) {
    return this.reportRepository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make: report.make })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: report.lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: report.lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year: report.year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage: report.mileage })
      .limit(3)
      .getRawOne();
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.reportRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    const updatedReport = this.reportRepository.merge(report, { approved });

    return this.reportRepository.save(updatedReport);
  }
}
