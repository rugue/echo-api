import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album, AlbumDocument } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  private readonly logger = new Logger(AlbumsService.name);
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    this.logger.log('Creating album with data:', createAlbumDto);
    try {
      const newAlbum = new this.albumModel(createAlbumDto);
      return await newAlbum.save();
    } catch (error) {
      this.logger.error('Error creating album:', error);
      throw error;
    }
  }

  async findAll(): Promise<Album[]> {
    return this.albumModel.find().populate('artist').exec();
  }

  async findOne(id: string): Promise<Album> {
    return this.albumModel.findById(id).populate('artist').exec();
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    return this.albumModel
      .findByIdAndUpdate(id, updateAlbumDto, { new: true })
      .populate('artist')
      .exec();
  }

  async remove(id: string): Promise<Album> {
    return this.albumModel.findByIdAndDelete(id).exec();
  }
}
