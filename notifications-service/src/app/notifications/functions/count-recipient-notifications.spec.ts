import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  test('it should be able to count a certain recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    notificationsRepository.create(
      makeNotification({
        recipientId: '1',
      }),
    );
    notificationsRepository.create(
      makeNotification({
        recipientId: '1',
      }),
    );
    notificationsRepository.create(
      makeNotification({
        recipientId: '2',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: notificationsRepository.notifications[0].recipientId,
    });

    expect(count).toEqual(2);
  });
});
