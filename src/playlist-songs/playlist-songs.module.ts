import { Module } from '@nestjs/common';
import { PlaylistSongsService } from './playlist-songs.service';
import { PlaylistSongsController } from './playlist-songs.controller';

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
