import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLikeDto {
  @ApiProperty({ description: 'The ID of the user' })
  @IsString()
  @IsNotEmpty()
  user: string;

  @ApiProperty({ description: 'The ID of the song' })
  @IsString()
  @IsNotEmpty()
  song: string;
}
