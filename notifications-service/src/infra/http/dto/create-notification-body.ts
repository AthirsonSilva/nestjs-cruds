import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationBody {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  recipientId: string;
}
