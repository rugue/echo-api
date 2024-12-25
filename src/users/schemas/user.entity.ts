import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' }) // role: user or artist
  role: string;

  @Prop()
  name?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
