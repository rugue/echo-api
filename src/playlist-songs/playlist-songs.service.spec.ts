import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistSongsService } from './playlist-songs.service';

describe('PlaylistSongsService', () => {
  let service: PlaylistSongsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaylistSongsService],
    }).compile();

    service = module.get<PlaylistSongsService>(PlaylistSongsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
