import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SongBodyDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song, SongDocument } from './entities/song.entity';
import { AlbumsService } from 'src/albums/albums.service';

@Injectable()
export class SongsService {
  constructor(
    @InjectModel(Song.name) private songModel: Model<SongDocument>,
    private readonly albumsService: AlbumsService,
  ) {}

  async create(songBodyDto: SongBodyDto, filePath: string): Promise<Song> {
    // console.log(typeof songBodyDto?.title);

    // return;
    const newSong = new this.songModel({
      ...songBodyDto,
      filePath,
    });

    return newSong.save();
  }

  async findAll(): Promise<Song[]> {
    return this.songModel.find().populate('album').exec();
  }

  async findOne(id: string): Promise<Song> {
    return this.songModel.findById(id).populate('album').exec();
  }

  async update(id: string, updateSongDto: UpdateSongDto): Promise<Song> {
    return this.songModel
      .findByIdAndUpdate(id, updateSongDto, { new: true })
      .populate('album')
      .exec();
  }

  async remove(id: string): Promise<Song> {
    return this.songModel.findByIdAndDelete(id).exec();
  }
}
