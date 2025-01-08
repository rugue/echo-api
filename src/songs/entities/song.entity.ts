import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/albums/entities/album.entity';

export type SongDocument = Song & Document;

@Schema({ timestamps: true })
export class Song {
  @ApiProperty({ description: 'The unique identifier of the song' })
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;

  @ApiProperty({ description: 'The title of the song' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'The duration of the song in seconds' })
  @Prop({ required: true })
  duration: number;

  @ApiProperty({ description: 'The track number of the song' })
  @Prop({ required: true })
  trackNumber: number;

  @ApiProperty({ description: 'The file URL of the song' })
  @Prop({ required: true })
  fileUrl: string;

  @ApiProperty({ description: 'The album associated with the song' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Album', required: true })
  album: Album;

  @ApiProperty({ description: 'The creation date of the song' })
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @ApiProperty({ description: 'The last update date of the song' })
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const SongSchema = SchemaFactory.createForClass(Song);
