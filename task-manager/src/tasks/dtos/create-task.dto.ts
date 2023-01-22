import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 255)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 255)
  description: string;
}
