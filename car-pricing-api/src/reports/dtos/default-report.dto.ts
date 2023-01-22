import { Expose, Transform } from 'class-transformer';

export class DefaultReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  approved: boolean;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  make: number;

  @Expose()
  model: string;

  @Expose()
  mileage: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
