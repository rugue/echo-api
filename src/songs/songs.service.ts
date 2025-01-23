import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SongBodyDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song, SongDocument } from './entities/song.entity';
import { AlbumsService } from 'src/albums/albums.service';
import { Response } from 'express';
import * as fs from 'fs';

@Injectable()
export class SongsService {
  constructor(
    @InjectModel(Song.name) private songModel: Model<SongDocument>,
    private readonly albumsService: AlbumsService,
  ) {}

  async create(songBodyDto: SongBodyDto, filePath: string): Promise<Song> {
    // console.log(typeof songBodyDto?.title);

    const album = await this.albumsService.findOne(songBodyDto.album);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    // return;
    const newSong = new this.songModel({
      ...songBodyDto,
      filePath,
    });

    await newSong.save();

    newSong.populate('album');

    return newSong;
  }

  async findAll(): Promise<Song[]> {
    return this.songModel.find().populate('album').exec();
  }

  async findOne(id: string): Promise<Song> {
    const song = await this.songModel.findById(id).populate('album').exec();

    if (!song) {
      throw new NotFoundException('Song not found');
    }

    return song;
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

  async stream(id: string, res: Response) {
    const song = await this.findOne(id);

    const { filePath } = song;

    const readStream = fs.createReadStream(filePath);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', 'inline');

    readStream.pipe(res);
  }
}
