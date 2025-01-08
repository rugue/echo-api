import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @ApiProperty({ description: 'The title of the album', required: false })
  title?: string;

  @ApiProperty({
    description: 'The release date of the album',
    required: false,
  })
  releaseDate?: Date;

  @ApiProperty({ description: 'The genre of the album', required: false })
  genre?: string;

  @ApiProperty({
    description: 'The cover image URL of the album',
    required: false,
  })
  coverImageUrl?: string;

  @ApiProperty({
    description: 'The ID of the artist associated with the album',
    required: false,
  })
  artist?: string;
}
