import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Like, LikeDocument } from './entities/like.entity';

@Injectable()
export class LikesService {
  constructor(@InjectModel(Like.name) private likeModel: Model<LikeDocument>) {}

  async create(createLikeDto: CreateLikeDto): Promise<Like> {
    const newLike = new this.likeModel(createLikeDto);
    return newLike.save();
  }

  async findAll(): Promise<Like[]> {
    return this.likeModel.find().populate('user song').exec();
  }

  async findOne(user: string, song: string): Promise<Like> {
    return this.likeModel.findOne({ user, song }).populate('user song').exec();
  }

  async update(
    user: string,
    song: string,
    updateLikeDto: UpdateLikeDto,
  ): Promise<Like> {
    return this.likeModel
      .findOneAndUpdate({ user, song }, updateLikeDto, { new: true })
      .populate('user song')
      .exec();
  }

  async remove(user: string, song: string): Promise<Like> {
    return this.likeModel.findOneAndDelete({ user, song }).exec();
  }
}
