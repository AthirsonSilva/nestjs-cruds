import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  test('it should be able to get a certain recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: notificationsRepository.notifications[0].recipientId,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId: notificationsRepository.notifications[0].recipientId,
        }),
        expect.objectContaining({
          recipientId: notificationsRepository.notifications[0].recipientId,
        }),
      ]),
    );
  });
});
