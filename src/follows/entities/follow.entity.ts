import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/schemas/user.entity';
import { Artist } from 'src/artists/entities/artist.entity';

export type FollowDocument = Follow & Document;

@Schema({ timestamps: true })
export class Follow {
  @ApiProperty({ description: 'The user who follows the artist' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  user: User;

  @ApiProperty({ description: 'The followed artist' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Artist', required: true })
  artist: Artist;

  @ApiProperty({ description: 'The date the artist was followed' })
  @Prop({ type: Date, default: Date.now })
  followedAt: Date;
}

export const FollowSchema = SchemaFactory.createForClass(Follow);
