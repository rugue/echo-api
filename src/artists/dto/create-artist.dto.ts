import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ description: 'The name of the artist' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The biography of the artist', required: false })
  @IsString()
  bio?: string;

  @ApiProperty({ description: 'The genre of the artist', required: false })
  @IsString()
  genre?: string;

  @ApiProperty({ description: 'The popularity of the artist', required: false })
  @IsInt()
  popularity?: number;
}
