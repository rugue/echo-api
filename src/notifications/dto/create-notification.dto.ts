import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({ description: 'The ID of the user' })
  @IsString()
  @IsNotEmpty()
  user: string;

  @ApiProperty({ description: 'The message of the notification' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'The read status of the notification',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  read?: boolean;
}
