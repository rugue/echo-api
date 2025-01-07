import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes, Types } from 'mongoose';
import { Post } from 'src/posts/schema/post.schema';
import { UserSettings } from 'src/settings/schemas/UserSettings.schema';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User {
  @ApiProperty({ description: 'The unique identifier of the user' })
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  @ApiProperty({ description: 'The username of the user' })
  username: string;

  @Prop({ required: true, unique: true })
  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @Prop({ required: true })
  @ApiProperty({ description: 'The password hash of the user' })
  password_hash: string;

  @ApiProperty({
    description: 'The refresh token of the user',
    required: false,
  })
  @Prop()
  refreshToken?: string;

  @ApiProperty({ description: 'The role of the user', default: 'user' })
  @Prop({ default: 'user' }) // role: user or artist
  role: string;

  // @Prop()
  // name?: string;

  @ApiProperty({
    description: 'The settings of the user',
    required: false,
    type: UserSettings,
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
  settings?: UserSettings;

  @ApiProperty({ description: 'The posts of the user', type: [Post] })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: Post[];

  @ApiProperty({
    description: 'The artist associated with the user',
    required: false,
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' })
  artist?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
