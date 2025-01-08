import { PartialType } from '@nestjs/swagger';
import { CreateStreamingHistoryDto } from './create-streaming-history.dto';

export class UpdateStreamingHistoryDto extends PartialType(
  CreateStreamingHistoryDto,
) {}
