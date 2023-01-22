import { CancelNotification } from '@app/notifications/functions/cancel-notifications';
import { CountRecipientNotifications } from '@app/notifications/functions/count-recipient-notifications';
import { GetRecipientNotifications } from '@app/notifications/functions/get-recipient-notifications';
import { ReadNotification } from '@app/notifications/functions/read-notification';
import { SendNotification } from '@app/notifications/functions/send-notification';
import { UnreadNotification } from '@app/notifications/functions/unread-notification';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    GetRecipientNotifications,
    CountRecipientNotifications,
  ],
})
export class HttpModule {}
