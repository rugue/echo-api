import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StreamingHistoryService } from './streaming_history.service';
import { CreateStreamingHistoryDto } from './dto/create-streaming_history.dto';
import { UpdateStreamingHistoryDto } from './dto/update-streaming_history.dto';

@Controller('streaming-history')
export class StreamingHistoryController {
  constructor(private readonly streamingHistoryService: StreamingHistoryService) {}

  @Post()
  create(@Body() createStreamingHistoryDto: CreateStreamingHistoryDto) {
    return this.streamingHistoryService.create(createStreamingHistoryDto);
  }

  @Get()
  findAll() {
    return this.streamingHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.streamingHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStreamingHistoryDto: UpdateStreamingHistoryDto) {
    return this.streamingHistoryService.update(+id, updateStreamingHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.streamingHistoryService.remove(+id);
  }
}
