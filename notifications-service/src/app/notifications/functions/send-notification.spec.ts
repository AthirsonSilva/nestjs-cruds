import { Notification } from '../entities/notification.entity';
import { InMemoryNotificationsRepository } from './../../../../test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  test('it should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      recipientId: '123',
      content: 'Your recent order has been shipped.',
      category: 'order',
    });

    expect(notification).toBeInstanceOf(Notification);
    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
