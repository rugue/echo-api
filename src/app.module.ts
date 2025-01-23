import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';
import { PostsModule } from './posts/posts.module';
import { ArtistsModule } from './artists/artists.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AlbumsModule } from './albums/albums.module';
import { SongsModule } from './songs/songs.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { PlaylistSongsModule } from './playlist-songs/playlist-songs.module';
import { LikesModule } from './likes/likes.module';
import { FollowsModule } from './follows/follows.module';
import { StreamingHistoryModule } from './streaming_history/streaming_history.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    SettingsModule,
    PostsModule,
    ArtistsModule,
    AlbumsModule,
    SongsModule,
    PlaylistsModule,
    PlaylistSongsModule,
    LikesModule,
    FollowsModule,
    StreamingHistoryModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
