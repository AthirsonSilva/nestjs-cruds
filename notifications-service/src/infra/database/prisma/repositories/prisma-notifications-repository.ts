import { Injectable } from '@nestjs/common';
import { Notification } from 'src/app/notifications/entities/notification.entity';
import { NotificationsRepository } from '../../../../app/notifications/repositories/notifications-repository';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async findManyById(recipientId: string): Promise<Notification[]> {
    const rawPrismaNotifications =
      await this.prismaService.notification.findMany({
        where: {
          recipientId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

    return rawPrismaNotifications.map(PrismaNotificationMapper.toDomain);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: {
        recipientId,
      },
    });

    return count;
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const rawPrismaNotification =
      await this.prismaService.notification.findUnique({
        where: {
          id: notificationId,
        },
      });

    return PrismaNotificationMapper.toDomain(rawPrismaNotification);
  }

  async save(notification: Notification): Promise<void> {
    const rawNotification = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      where: {
        id: rawNotification.id,
      },
      data: rawNotification,
    });
  }

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        category: notification.category,
        content: notification.content.value,
        recipientId: notification.recipientId,
        createdAt: notification.createdAt,
        readAt: notification.readAt,
      },
    });
  }
}
