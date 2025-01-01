import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.entity';
import {
  UserSettings,
  UserSettingsSchema,
} from 'src/settings/schemas/UserSettings.schema';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: UserSettings.name,
        schema: UserSettingsSchema,
        collection: 'userSettings',
      },
    ]),
    ArtistsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
