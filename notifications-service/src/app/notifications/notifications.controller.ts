import { Body, Controller } from '@nestjs/common';
import { CreateNotificationDto } from '../../infra/http/dto/create-notification.dto';
import { UpdateNotificationDto } from '../../infra/http/dto/update-notification.dto';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  findAll() {
    return this.notificationsService.findAll();
  }

  findOne(@Body() id: number) {
    return this.notificationsService.findOne(id);
  }

  update(@Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(
      updateNotificationDto.id,
      updateNotificationDto,
    );
  }

  remove(@Body() id: number) {
    return this.notificationsService.remove(id);
  }
}
