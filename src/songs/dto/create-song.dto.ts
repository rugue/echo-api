import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateSongDto {
  @ApiProperty({ description: 'The title of the song' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The duration of the song in seconds' })
  @IsInt()
  @IsNotEmpty()
  duration: number;

  @ApiProperty({ description: 'The track number of the song' })
  @IsInt()
  @IsNotEmpty()
  trackNumber: number;

  @ApiProperty({ description: 'The file URL of the song' })
  @IsUrl({}, { message: 'Invalid URL format' })
  @IsOptional()
  @IsNotEmpty()
  fileUrl?: string;

  @ApiProperty({ description: 'The ID of the album associated with the song' })
  @IsString()
  @IsNotEmpty()
  album: string;

  @IsString()
  @IsNotEmpty()
  artist: string;

  filePath?: string;
}
