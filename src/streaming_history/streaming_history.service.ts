import { Injectable } from '@nestjs/common';
import { CreateStreamingHistoryDto } from './dto/create-streaming_history.dto';
import { UpdateStreamingHistoryDto } from './dto/update-streaming_history.dto';

@Injectable()
export class StreamingHistoryService {
  create(createStreamingHistoryDto: CreateStreamingHistoryDto) {
    return 'This action adds a new streamingHistory';
  }

  findAll() {
    return `This action returns all streamingHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} streamingHistory`;
  }

  update(id: number, updateStreamingHistoryDto: UpdateStreamingHistoryDto) {
    return `This action updates a #${id} streamingHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} streamingHistory`;
  }
}
