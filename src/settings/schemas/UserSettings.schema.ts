import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class UserSettings {
  @Prop({ required: false })
  receivedNotifications?: boolean;

  @Prop({ required: false }) // role: user or artist
  receivedEmails?: boolean;

  @Prop({ required: false })
  receivedSMS?: boolean;
}
