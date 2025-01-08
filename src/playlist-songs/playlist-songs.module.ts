import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistSongsService } from './playlist-songs.service';
import { PlaylistSongsController } from './playlist-songs.controller';
import {
  PlaylistSong,
  PlaylistSongSchema,
} from './entities/playlist-song.entity';
import { PlaylistsModule } from 'src/playlists/playlists.module';
import { SongsModule } from 'src/songs/songs.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlaylistSong.name, schema: PlaylistSongSchema },
    ]),
    PlaylistsModule,
    SongsModule,
  ],
  controllers: [PlaylistSongsController],
  providers: [PlaylistSongsService],
  exports: [PlaylistSongsService],
})
export class PlaylistSongsModule {}
