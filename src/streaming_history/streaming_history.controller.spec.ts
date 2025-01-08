import { Test, TestingModule } from '@nestjs/testing';
import { StreamingHistoryController } from './streaming_history.controller';
import { StreamingHistoryService } from './streaming_history.service';

describe('StreamingHistoryController', () => {
  let controller: StreamingHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreamingHistoryController],
      providers: [StreamingHistoryService],
    }).compile();

    controller = module.get<StreamingHistoryController>(StreamingHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
