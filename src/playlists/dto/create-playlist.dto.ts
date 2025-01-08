import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreatePlaylistDto {
  @ApiProperty({ description: 'The name of the playlist' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the playlist',
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'The cover image URL of the playlist',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  coverImageUrl: string;

  @ApiProperty({
    description: 'The ID of the user associated with the playlist',
  })
  @IsString()
  @IsNotEmpty()
  user: string;
}
