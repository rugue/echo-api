import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist, ArtistDocument } from './entities/artist.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
  ) {}
  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = new this.artistModel(createArtistDto);
    return newArtist.save();
  }

  async findAll(): Promise<Artist[]> {
    return this.artistModel.find().exec();
  }

  async findById(id: string): Promise<Artist> {
    return this.artistModel.findById(id).exec();
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    return this.artistModel
      .findByIdAndUpdate(id, updateArtistDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Artist> {
    return this.artistModel.findByIdAndDelete(id).exec();
  }
}
