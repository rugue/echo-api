import { Module } from '@nestjs/common';
import { StreamingHistoryService } from './streaming_history.service';
import { StreamingHistoryController } from './streaming_history.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StreamingHistory.name, schema: StreamingHistorySchema },
    ]),
    UsersModule,
    SongsModule,
  ],
  controllers: [StreamingHistoryController],
  providers: [StreamingHistoryService],
  exports: [StreamingHistoryService],
})
export class StreamingHistoryModule {}
