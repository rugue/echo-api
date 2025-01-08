import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Song, SongSchema } from './entities/song.entity';
import { AlbumsModule } from 'src/albums/albums.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Song.name, schema: SongSchema }]),
    AlbumsModule,
  ],
  controllers: [SongsController],
  providers: [SongsService],
  exports: [SongsService],
})
export class SongsModule {}
