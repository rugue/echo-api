import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
  ) {}
  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = new this.albumModel(createAlbumDto);
    return newAlbum.save();
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
