import { CancelNotification } from '@app/notifications/functions/cancel-notifications';
import { CountRecipientNotifications } from '@app/notifications/functions/count-recipient-notifications';
import { GetRecipientNotifications } from '@app/notifications/functions/get-recipient-notifications';
import { ReadNotification } from '@app/notifications/functions/read-notification';
import { SendNotification } from '@app/notifications/functions/send-notification';
import { UnreadNotification } from '@app/notifications/functions/unread-notification';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dto/create-notification-body';
import { NotificationViewModel } from '../view-model/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private getRecipientNotifications: GetRecipientNotifications,
    private countRecipientNotifications: CountRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') notificationId: string) {
    try {
      await this.cancelNotification.execute({ notificationId });
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('recipient/:id/count')
  async countFromRecipient(@Param('id') recipientId: string) {
    try {
      const { count } = await this.countRecipientNotifications.execute({
        recipientId,
      });

      return { count };
    } catch (e) {
      throw new Error(e);
    }
  }

  @Get('recipient/:id/notifications')
  async getFromRecipient(@Param('id') recipientId: string) {
    try {
      const { notifications } = await this.getRecipientNotifications.execute({
        recipientId,
      });

      return {
        notifications: notifications.map(NotificationViewModel.toHTTP),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  @Patch(':id/read')
  async read(@Param('id') notificationId: string) {
    try {
      await this.readNotification.execute({ notificationId });
    } catch (e) {
      throw new Error(e);
    }
  }

  @Patch(':id/unread')
  async unread(@Param('id') notificationId: string) {
    try {
      await this.unreadNotification.execute({ notificationId });
    } catch (e) {
      throw new Error(e);
    }
  }

  @Post()
  async Create(@Body() request: CreateNotificationBody) {
    try {
      const { recipientId, content, category } = request;

      const { notification } = await this.sendNotification.execute({
        recipientId,
        content,
        category,
      });

      return { notification };
    } catch (e) {
      throw new Error(e);
    }
  }
}
