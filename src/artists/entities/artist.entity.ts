import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ArtistDocument = Artist & Document;

@Schema({ timestamps: true })
export class Artist {
  @ApiProperty({ description: 'The name of the artist' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'The biography of the artist', required: false })
  @Prop()
  bio: string;

  @ApiProperty({ description: 'The genre of the artist', required: false })
  @Prop()
  genre: string;

  @ApiProperty({ description: 'The popularity of the artist', required: false })
  @Prop({ default: 0 })
  popularity: number;

  @ApiProperty({
    description: 'The creation date of the artist',
    required: false,
  })
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @ApiProperty({
    description: 'The last update date of the artist',
    required: false,
  })
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
