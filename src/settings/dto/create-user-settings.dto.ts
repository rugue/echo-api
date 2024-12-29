import { IsBoolean, IsOptional } from 'class-validator';

export class CreateUserSettingsDto {
  @IsOptional()
  @IsBoolean()
  receivedNotifications?: boolean;

  @IsOptional()
  @IsBoolean()
  receivedEmails?: boolean;

  @IsOptional()
  @IsBoolean()
  receivedSMS?: boolean;
}
