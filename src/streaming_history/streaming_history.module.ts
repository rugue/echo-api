import { Module } from '@nestjs/common';
import { StreamingHistoryService } from './streaming_history.service';
import { StreamingHistoryController } from './streaming_history.controller';

@Module({
  controllers: [StreamingHistoryController],
  providers: [StreamingHistoryService],
})
export class StreamingHistoryModule {}
