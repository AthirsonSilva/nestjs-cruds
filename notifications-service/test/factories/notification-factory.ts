import { Content } from '@/app/notifications/entities/content';
import {
  Notification,
  NotificationProps,
} from '@/app/notifications/entities/notification.entity';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'order',
    content: new Content('Your recent order has been shipped.'),
    recipientId: '123',
    ...override,
  });
}
