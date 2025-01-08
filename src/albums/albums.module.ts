import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { Album, AlbumSchema } from './entities/album.entity';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    ArtistsModule,
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
