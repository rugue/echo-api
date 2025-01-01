import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ArtistDocument = Artist & Document;

@Schema({ timestamps: true })
export class Artist {
  @Prop({ required: true })
  name: string;

  @Prop()
  bio: string;

  @Prop()
  genre: string;
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);
