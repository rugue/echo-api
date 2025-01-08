import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { Follow, FollowDocument } from './entities/follow.entity';

@Injectable()
export class FollowsService {
  constructor(
    @InjectModel(Follow.name) private followModel: Model<FollowDocument>,
  ) {}

  async create(createFollowDto: CreateFollowDto): Promise<Follow> {
    const newFollow = new this.followModel(createFollowDto);
    return newFollow.save();
  }

  async findAll(): Promise<Follow[]> {
    return this.followModel.find().populate('user artist').exec();
  }

  async findOne(user: string, artist: string): Promise<Follow> {
    return this.followModel
      .findOne({ user, artist })
      .populate('user artist')
      .exec();
  }

  async update(
    user: string,
    artist: string,
    updateFollowDto: UpdateFollowDto,
  ): Promise<Follow> {
    return this.followModel
      .findOneAndUpdate({ user, artist }, updateFollowDto, { new: true })
      .populate('user artist')
      .exec();
  }

  async remove(user: string, artist: string): Promise<Follow> {
    return this.followModel.findOneAndDelete({ user, artist }).exec();
  }
}
