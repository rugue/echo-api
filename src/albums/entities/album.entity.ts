import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Artist } from 'src/artists/entities/artist.entity';

export type AlbumDocument = Album & Document;

@Schema({ timestamps: true })
export class Album {
  @ApiProperty({ description: 'The unique identifier of the album' })
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: Types.ObjectId;

  @ApiProperty({ description: 'The title of the album' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    description: 'The release date of the album',
    required: false,
  })
  @Prop()
  releaseDate: Date;

  @ApiProperty({ description: 'The genre of the album', required: false })
  @Prop()
  genre: string;

  @ApiProperty({
    description: 'The cover image URL of the album',
    required: false,
  })
  @Prop()
  coverImageUrl: string;

  @ApiProperty({ description: 'The artist associated with the album' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Artist', required: true })
  artist: Artist;

  @ApiProperty({
    description: 'The creation date of the album',
    required: false,
  })
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @ApiProperty({
    description: 'The last update date of the album',
    required: false,
  })
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
