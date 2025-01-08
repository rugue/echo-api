import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/schemas/user.entity';

export type PlaylistDocument = Playlist & Document;

@Schema({ timestamps: true })
export class Playlist {
  @ApiProperty({ description: 'The unique identifier of the playlist' })
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;

  @ApiProperty({ description: 'The name of the playlist' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'The description of the playlist',
    required: false,
  })
  @Prop()
  description: string;

  @ApiProperty({
    description: 'The cover image URL of the playlist',
    required: false,
  })
  @Prop()
  coverImageUrl: string;

  @ApiProperty({ description: 'The user associated with the playlist' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  user: User;

  @ApiProperty({ description: 'The creation date of the playlist' })
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @ApiProperty({ description: 'The last update date of the playlist' })
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
