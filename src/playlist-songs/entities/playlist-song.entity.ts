import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Playlist } from 'src/playlists/entities/playlist.entity';
import { Song } from 'src/songs/entities/song.entity';

export type PlaylistSongDocument = PlaylistSong & Document;

@Schema({ timestamps: true })
export class PlaylistSong {
  @ApiProperty({ description: 'The playlist associated with the song' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Playlist', required: true })
  playlist: Playlist;

  @ApiProperty({ description: 'The song associated with the playlist' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Song', required: true })
  song: Song;

  @ApiProperty({ description: 'The date the song was added to the playlist' })
  @Prop({ type: Date, default: Date.now })
  addedAt: Date;
}

export const PlaylistSongSchema = SchemaFactory.createForClass(PlaylistSong);
