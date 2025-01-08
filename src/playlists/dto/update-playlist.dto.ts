import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistDto } from './create-playlist.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
  @ApiProperty({ description: 'The name of the playlist', required: false })
  name?: string;

  @ApiProperty({
    description: 'The description of the playlist',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'The cover image URL of the playlist',
    required: false,
  })
  coverImageUrl?: string;

  @ApiProperty({
    description: 'The ID of the user associated with the playlist',
    required: false,
  })
  user?: string;
}
