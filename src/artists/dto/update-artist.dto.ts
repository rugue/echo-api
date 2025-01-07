import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @ApiProperty({ description: 'The name of the artist', required: false })
  name?: string;

  @ApiProperty({ description: 'The biography of the artist', required: false })
  bio?: string;

  @ApiProperty({ description: 'The genre of the artist', required: false })
  genre?: string;

  @ApiProperty({ description: 'The popularity of the artist', required: false })
  popularity?: number;
}
