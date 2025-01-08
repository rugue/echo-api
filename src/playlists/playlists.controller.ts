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
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { ApiTags, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Playlist } from './entities/playlist.entity';

@ApiTags('playlists')
@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CreatePlaylistDto })
  @ApiResponse({
    status: 201,
    description: 'Playlist successfully created.',
    type: Playlist,
  })
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistsService.create(createPlaylistDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of playlists',
    type: [Playlist],
  })
  findAll() {
    return this.playlistsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'The ID of the playlist' })
  @ApiResponse({ status: 200, description: 'Playlist found', type: Playlist })
  @ApiResponse({ status: 404, description: 'Playlist not found' })
  findOne(@Param('id') id: string) {
    return this.playlistsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @ApiParam({ name: 'id', description: 'The ID of the playlist' })
  @ApiBody({ type: UpdatePlaylistDto })
  @ApiResponse({
    status: 200,
    description: 'Playlist successfully updated.',
    type: Playlist,
  })
  @ApiResponse({ status: 404, description: 'Playlist not found' })
  update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistsService.update(id, updatePlaylistDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @ApiParam({ name: 'id', description: 'The ID of the playlist' })
  @ApiResponse({ status: 200, description: 'Playlist successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Playlist not found' })
  remove(@Param('id') id: string) {
    return this.playlistsService.remove(id);
  }
}
