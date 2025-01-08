import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StreamingHistoryService } from './streaming_history.service';
import { StreamingHistoryController } from './streaming_history.controller';
import {
  StreamingHistory,
  StreamingHistorySchema,
} from './entities/streaming-history.entity';
import { UsersModule } from 'src/users/users.module';
import { SongsModule } from 'src/songs/songs.module';

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
