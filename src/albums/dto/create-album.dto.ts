import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateAlbumDto {
  @ApiProperty({ description: 'The title of the album' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The release date of the album',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  releaseDate: Date;

  @ApiProperty({ description: 'The genre of the album', required: false })
  @IsString()
  @IsOptional()
  genre: string;

  @ApiProperty({
    description: 'The cover image URL of the album',
    required: false,
  })
  @IsString()
  @IsOptional()
  coverImageUrl: string;

  @ApiProperty({
    description: 'The ID of the artist associated with the album',
  })
  @IsString()
  @IsNotEmpty()
  artist: Types.ObjectId;
}
