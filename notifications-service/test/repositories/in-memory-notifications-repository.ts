import { Notification } from '@app/notifications/entities/notification.entity';
import { NotificationNotFound } from '@app/notifications/functions/errors/notification-not-found';
import { NotificationsRepository } from 'src/app/notifications/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  findManyById(recipientId: string): Promise<Notification[]> {
    return Promise.resolve(
      this.notifications.filter((notification) =>
        recipientId.includes(notification.recipientId),
      ),
    );
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
  }

  public notifications: Notification[] = new Array<Notification>();

  findById(notificationId: string): Promise<Notification> {
    const notification = this.notifications.find(
      (notification) => notification.id === notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    return Promise.resolve(notification);
  }

  save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (notification) => notification.id === notification.id,
    );

    if (notificationIndex === -1) {
      throw new NotificationNotFound();
    }

    this.notifications[notificationIndex] = notification;

    return Promise.resolve();
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
