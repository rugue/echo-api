import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { Song, SongSchema } from './entities/song.entity';
import { AlbumsModule } from 'src/albums/albums.module';
import { FilesService } from 'src/files/files.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Song.name, schema: SongSchema }]),
    AlbumsModule,
  ],
  controllers: [SongsController],
  providers: [SongsService, FilesService],
  exports: [SongsService],
})
export class SongsModule {}
