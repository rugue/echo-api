import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFollowDto {
  @ApiProperty({ description: 'The ID of the user' })
  @IsString()
  @IsNotEmpty()
  user: string;

  @ApiProperty({ description: 'The ID of the artist' })
  @IsString()
  @IsNotEmpty()
  artist: string;
}
