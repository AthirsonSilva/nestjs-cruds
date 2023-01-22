import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification.entity';
import { NotificationsRepository } from '../repositories/notifications-repository';
interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    try {
      const { content, category, recipientId } = request;

      const notification = new Notification({
        recipientId: recipientId,
        content: new Content(content as string),
        category,
      });

      await this.notificationsRepository.create(notification);

      return { notification };
    } catch (e) {
      throw new Error(e);
    }
  }
}
