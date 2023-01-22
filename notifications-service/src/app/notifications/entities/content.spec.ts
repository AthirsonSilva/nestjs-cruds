import { Content } from './content';

describe('Notification content', () => {
  test('should be able to create a notification content', () => {
    expect(
      () => new Content('Your recent order has been shipped.'),
    ).toBeTruthy();
  });

  test('should be able to create a notification content', () => {
    expect(
      () => new Content('Your recent order has been shipped.'),
    ).toBeTruthy();
  });

  test('should not be able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrowError();
  });
});
