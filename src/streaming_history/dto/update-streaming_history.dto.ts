import { PartialType } from '@nestjs/swagger';
import { CreateStreamingHistoryDto } from './create-streaming_history.dto';

export class UpdateStreamingHistoryDto extends PartialType(CreateStreamingHistoryDto) {}
