import { makeNotification } from '@test/factories/notification-factory';

describe('Notification', () => {
  test('should be able to create a notification', () => {
    expect(() => makeNotification()).toBeTruthy();
  });
});
