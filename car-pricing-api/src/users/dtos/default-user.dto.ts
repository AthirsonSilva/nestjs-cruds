import { Exclude, Expose } from 'class-transformer';

@Expose()
export class DefaultUserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Exclude()
  password: string;
}
