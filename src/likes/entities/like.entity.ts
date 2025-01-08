import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/schemas/user.entity';
import { Song } from 'src/songs/entities/song.entity';

export type LikeDocument = Like & Document;

@Schema({ timestamps: true })
export class Like {
  @ApiProperty({ description: 'The user who liked the song' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  user: User;

  @ApiProperty({ description: 'The liked song' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Song', required: true })
  song: Song;

  @ApiProperty({ description: 'The date the song was liked' })
  @Prop({ type: Date, default: Date.now })
  likedAt: Date;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
