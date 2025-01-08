import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/schemas/user.entity';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @ApiProperty({ description: 'The unique identifier of the notification' })
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;

  @ApiProperty({ description: 'The user associated with the notification' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  user: User;

  @ApiProperty({ description: 'The message of the notification' })
  @Prop({ required: true })
  message: string;

  @ApiProperty({ description: 'The read status of the notification' })
  @Prop({ default: false })
  read: boolean;

  @ApiProperty({ description: 'The creation date of the notification' })
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
