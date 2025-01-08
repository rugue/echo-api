import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/schemas/user.entity';
import { Song } from 'src/songs/entities/song.entity';

export type StreamingHistoryDocument = StreamingHistory & Document;

@Schema({ timestamps: true })
export class StreamingHistory {
  @ApiProperty({ description: 'The user who played the song' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  user: User;

  @ApiProperty({ description: 'The played song' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Song', required: true })
  song: Song;

  @ApiProperty({ description: 'The date the song was played' })
  @Prop({ type: Date, default: Date.now })
  playedAt: Date;
}

export const StreamingHistorySchema =
  SchemaFactory.createForClass(StreamingHistory);
