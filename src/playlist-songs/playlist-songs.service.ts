import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlaylistSongDto } from './dto/create-playlist-song.dto';
import { UpdatePlaylistSongDto } from './dto/update-playlist-song.dto';
import {
  PlaylistSong,
  PlaylistSongDocument,
} from './entities/playlist-song.entity';

@Injectable()
export class PlaylistSongsService {
  constructor(
    @InjectModel(PlaylistSong.name)
    private playlistSongModel: Model<PlaylistSongDocument>,
  ) {}

  async create(
    createPlaylistSongDto: CreatePlaylistSongDto,
  ): Promise<PlaylistSong> {
    const newPlaylistSong = new this.playlistSongModel(createPlaylistSongDto);
    return newPlaylistSong.save();
  }

  async findAll(): Promise<PlaylistSong[]> {
    return this.playlistSongModel.find().populate('playlist song').exec();
  }

  async findOne(playlist: string, song: string): Promise<PlaylistSong> {
    return this.playlistSongModel
      .findOne({ playlist, song })
      .populate('playlist song')
      .exec();
  }

  async update(
    playlist: string,
    song: string,
    updatePlaylistSongDto: UpdatePlaylistSongDto,
  ): Promise<PlaylistSong> {
    return this.playlistSongModel
      .findOneAndUpdate({ playlist, song }, updatePlaylistSongDto, {
        new: true,
      })
      .populate('playlist song')
      .exec();
  }

  async remove(playlist: string, song: string): Promise<PlaylistSong> {
    return this.playlistSongModel.findOneAndDelete({ playlist, song }).exec();
  }
}
