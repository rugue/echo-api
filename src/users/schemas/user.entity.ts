import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Post } from 'src/posts/schema/post.schema';
import { UserSettings } from 'src/settings/schemas/UserSettings.schema';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password_hash: string;

  @Prop({ default: 'user' }) // role: user or artist
  role: string;

  @Prop({ default: Date.now })
  created_at: Date;

  // @Prop()
  // name?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
  settings?: UserSettings;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: Post[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' })
  artist?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
