import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistSongDto } from './create-playlist-song.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlaylistSongDto extends PartialType(CreatePlaylistSongDto) {
  @ApiProperty({ description: 'The ID of the playlist', required: false })
  playlist?: string;

  @ApiProperty({ description: 'The ID of the song', required: false })
  song?: string;
}
