import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ description: 'The name of the artist' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The biography of the artist', required: false })
  @IsString()
  @IsOptional()
  bio: string;

  @ApiProperty({ description: 'The genre of the artist', required: false })
  @IsString()
  @IsOptional()
  genre: string;

  @ApiProperty({ description: 'The popularity of the artist', required: false })
  @IsInt()
  @IsOptional()
  popularity: number;
}
