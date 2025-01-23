import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { Express } from 'express';

export class SongBodyDto {
  @IsNotEmpty()
  title: string;

  @IsNumberString()
  @IsNotEmpty()
  duration: number;

  @IsNumberString()
  @IsNotEmpty()
  trackNumber: number;

  @IsNotEmpty()
  album: string;

  @IsNotEmpty()
  artist: string;
}

export class FileDto {
  @ApiProperty({
    description: 'The file to upload (only .mp3 files are allowed)',
    type: 'string',
    format: 'binary',
  })
  file: Express.Multer.File;
}

export class CreateSongDto extends IntersectionType(SongBodyDto, FileDto) {}
