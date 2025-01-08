import { PartialType } from '@nestjs/mapped-types';
import { CreateSongDto } from './create-song.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSongDto extends PartialType(CreateSongDto) {
  @ApiProperty({ description: 'The title of the song', required: false })
  title?: string;

  @ApiProperty({
    description: 'The duration of the song in seconds',
    required: false,
  })
  duration?: number;

  @ApiProperty({ description: 'The track number of the song', required: false })
  trackNumber?: number;

  @ApiProperty({ description: 'The file URL of the song', required: false })
  fileUrl?: string;

  @ApiProperty({
    description: 'The ID of the album associated with the song',
    required: false,
  })
  album?: string;
}
