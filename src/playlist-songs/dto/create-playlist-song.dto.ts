import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlaylistSongDto {
  @ApiProperty({ description: 'The ID of the playlist' })
  @IsString()
  @IsNotEmpty()
  playlist: string;

  @ApiProperty({ description: 'The ID of the song' })
  @IsString()
  @IsNotEmpty()
  song: string;
}
