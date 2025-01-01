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
import { Artist, ArtistSchema } from 'src/artists/entities/artist.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: UserSettings.name,
        schema: UserSettingsSchema,
        collection: 'userSettings',
      },
      { name: Artist.name, schema: ArtistSchema },
    ]),
    ArtistsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
