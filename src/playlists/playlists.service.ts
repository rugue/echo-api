import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist, PlaylistDocument } from './entities/playlist.entity';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    const newPlaylist = new this.playlistModel(createPlaylistDto);
    return newPlaylist.save();
  }

  async findAll(): Promise<Playlist[]> {
    return this.playlistModel.find().populate('user').exec();
  }

  async findOne(id: string): Promise<Playlist> {
    return this.playlistModel.findById(id).populate('user').exec();
  }

  async update(
    id: string,
    updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<Playlist> {
    return this.playlistModel
      .findByIdAndUpdate(id, updatePlaylistDto, { new: true })
      .populate('user')
      .exec();
  }

  async remove(id: string): Promise<Playlist> {
    return this.playlistModel.findByIdAndDelete(id).exec();
  }
}
