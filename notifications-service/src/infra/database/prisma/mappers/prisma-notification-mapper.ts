import { Content } from '@/app/notifications/entities/content';
import { Notification } from '@/app/notifications/entities/notification.entity';
import { Notification as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
    };
  }

  static toDomain(rawPrismaNotification: RawNotification): Notification {
    return new Notification(
      {
        category: rawPrismaNotification.category,
        content: new Content(rawPrismaNotification.content),
        recipientId: rawPrismaNotification.recipientId,
        createdAt: rawPrismaNotification.createdAt,
        readAt: rawPrismaNotification.readAt,
      },
      rawPrismaNotification.id,
    );
  }
}
