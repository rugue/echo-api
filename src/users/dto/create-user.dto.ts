import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateUserSettingsDto } from 'src/settings/dto/create-user-settings.dto';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The password hash of the user' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The refresh token of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  refreshToken?: string;

  @ApiProperty({
    description: 'The settings of the user',
    required: false,
    type: CreateUserSettingsDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUserSettingsDto)
  settings?: CreateUserSettingsDto;

  @ApiProperty({ description: 'The role of the user', default: 'user' })
  @IsString()
  @IsNotEmpty()
  role: string;
}
