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
import { PlaylistSongsService } from './playlist-songs.service';
import { CreatePlaylistSongDto } from './dto/create-playlist-song.dto';
import { UpdatePlaylistSongDto } from './dto/update-playlist-song.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { ApiTags, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { PlaylistSong } from './entities/playlist-song.entity';

@ApiTags('playlist-songs')
@Controller('playlist-songs')
export class PlaylistSongsController {
  constructor(private readonly playlistSongsService: PlaylistSongsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CreatePlaylistSongDto })
  @ApiResponse({
    status: 201,
    description: 'Song successfully added to playlist.',
    type: PlaylistSong,
  })
  create(@Body() createPlaylistSongDto: CreatePlaylistSongDto) {
    return this.playlistSongsService.create(createPlaylistSongDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of playlist songs',
    type: [PlaylistSong],
  })
  findAll() {
    return this.playlistSongsService.findAll();
  }

  @Get(':playlist/:song')
  @ApiParam({ name: 'playlist', description: 'The ID of the playlist' })
  @ApiParam({ name: 'song', description: 'The ID of the song' })
  @ApiResponse({
    status: 200,
    description: 'Playlist song found',
    type: PlaylistSong,
  })
  @ApiResponse({ status: 404, description: 'Playlist song not found' })
  findOne(@Param('playlist') playlist: string, @Param('song') song: string) {
    return this.playlistSongsService.findOne(playlist, song);
  }

  @Patch(':playlist/:song')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @ApiParam({ name: 'playlist', description: 'The ID of the playlist' })
  @ApiParam({ name: 'song', description: 'The ID of the song' })
  @ApiBody({ type: UpdatePlaylistSongDto })
  @ApiResponse({
    status: 200,
    description: 'Playlist song successfully updated.',
    type: PlaylistSong,
  })
  @ApiResponse({ status: 404, description: 'Playlist song not found' })
  update(
    @Param('playlist') playlist: string,
    @Param('song') song: string,
    @Body() updatePlaylistSongDto: UpdatePlaylistSongDto,
  ) {
    return this.playlistSongsService.update(
      playlist,
      song,
      updatePlaylistSongDto,
    );
  }

  @Delete(':playlist/:song')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @ApiParam({ name: 'playlist', description: 'The ID of the playlist' })
  @ApiParam({ name: 'song', description: 'The ID of the song' })
  @ApiResponse({
    status: 200,
    description: 'Playlist song successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Playlist song not found' })
  remove(@Param('playlist') playlist: string, @Param('song') song: string) {
    return this.playlistSongsService.remove(playlist, song);
  }
}
