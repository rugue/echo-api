import { Test, TestingModule } from '@nestjs/testing';
import { StreamingHistoryService } from './streaming_history.service';

describe('StreamingHistoryService', () => {
  let service: StreamingHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StreamingHistoryService],
    }).compile();

    service = module.get<StreamingHistoryService>(StreamingHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
