import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { StreamingHistoryService } from './streaming_history.service';
import { CreateStreamingHistoryDto } from './dto/create-streaming-history.dto';
import { UpdateStreamingHistoryDto } from './dto/update-streaming-history.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { ApiTags, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { StreamingHistory } from './entities/streaming-history.entity';

@ApiTags('streaming-history')
@Controller('streaming-history')
export class StreamingHistoryController {
  constructor(
    private readonly streamingHistoryService: StreamingHistoryService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CreateStreamingHistoryDto })
  @ApiResponse({
    status: 201,
    description: 'Streaming history successfully created.',
    type: StreamingHistory,
  })
  create(@Body() createStreamingHistoryDto: CreateStreamingHistoryDto) {
    return this.streamingHistoryService.create(createStreamingHistoryDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of streaming history',
    type: [StreamingHistory],
  })
  findAll() {
    return this.streamingHistoryService.findAll();
  }

  @Get(':user/:song/:playedAt')
  @ApiParam({ name: 'user', description: 'The ID of the user' })
  @ApiParam({ name: 'song', description: 'The ID of the song' })
  @ApiParam({ name: 'playedAt', description: 'The date the song was played' })
  @ApiResponse({
    status: 200,
    description: 'Streaming history found',
    type: StreamingHistory,
  })
  @ApiResponse({ status: 404, description: 'Streaming history not found' })
  findOne(
    @Param('user') user: string,
    @Param('song') song: string,
    @Param('playedAt') playedAt: Date,
  ) {
    return this.streamingHistoryService.findOne(user, song, playedAt);
  }

  @Patch(':user/:song/:playedAt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @ApiParam({ name: 'user', description: 'The ID of the user' })
  @ApiParam({ name: 'song', description: 'The ID of the song' })
  @ApiParam({ name: 'playedAt', description: 'The date the song was played' })
  @ApiBody({ type: UpdateStreamingHistoryDto })
  @ApiResponse({
    status: 200,
    description: 'Streaming history successfully updated.',
    type: StreamingHistory,
  })
  @ApiResponse({ status: 404, description: 'Streaming history not found' })
  update(
    @Param('user') user: string,
    @Param('song') song: string,
    @Param('playedAt') playedAt: Date,
    @Body() updateStreamingHistoryDto: UpdateStreamingHistoryDto,
  ) {
    return this.streamingHistoryService.update(
      user,
      song,
      playedAt,
      updateStreamingHistoryDto,
    );
  }

  @Delete(':user/:song/:playedAt')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @ApiParam({ name: 'user', description: 'The ID of the user' })
  @ApiParam({ name: 'song', description: 'The ID of the song' })
  @ApiParam({ name: 'playedAt', description: 'The date the song was played' })
  @ApiResponse({
    status: 200,
    description: 'Streaming history successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Streaming history not found' })
  remove(
    @Param('user') user: string,
    @Param('song') song: string,
    @Param('playedAt') playedAt: Date,
  ) {
    return this.streamingHistoryService.remove(user, song, playedAt);
  }
}
