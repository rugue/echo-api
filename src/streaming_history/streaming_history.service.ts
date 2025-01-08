import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStreamingHistoryDto } from './dto/create-streaming-history.dto';
import { UpdateStreamingHistoryDto } from './dto/update-streaming-history.dto';
import {
  StreamingHistory,
  StreamingHistoryDocument,
} from './entities/streaming-history.entity';

@Injectable()
export class StreamingHistoryService {
  constructor(
    @InjectModel(StreamingHistory.name)
    private streamingHistoryModel: Model<StreamingHistoryDocument>,
  ) {}

  async create(
    createStreamingHistoryDto: CreateStreamingHistoryDto,
  ): Promise<StreamingHistory> {
    const newStreamingHistory = new this.streamingHistoryModel(
      createStreamingHistoryDto,
    );
    return newStreamingHistory.save();
  }

  async findAll(): Promise<StreamingHistory[]> {
    return this.streamingHistoryModel.find().populate('user song').exec();
  }

  async findOne(
    user: string,
    song: string,
    playedAt: Date,
  ): Promise<StreamingHistory> {
    return this.streamingHistoryModel
      .findOne({ user, song, playedAt })
      .populate('user song')
      .exec();
  }

  async update(
    user: string,
    song: string,
    playedAt: Date,
    updateStreamingHistoryDto: UpdateStreamingHistoryDto,
  ): Promise<StreamingHistory> {
    return this.streamingHistoryModel
      .findOneAndUpdate({ user, song, playedAt }, updateStreamingHistoryDto, {
        new: true,
      })
      .populate('user song')
      .exec();
  }

  async remove(
    user: string,
    song: string,
    playedAt: Date,
  ): Promise<StreamingHistory> {
    return this.streamingHistoryModel
      .findOneAndDelete({ user, song, playedAt })
      .exec();
  }
}
