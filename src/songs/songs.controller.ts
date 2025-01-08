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
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { ApiTags, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Song } from './entities/song.entity';

@ApiTags('songs')
@Controller('songs')
export class SongsController {
  constructor(
    private readonly songsService: SongsService,
    private readonly filesService: FilesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Artist)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('file', this.filesService.getMulterOptions()),
  )
  @ApiBody({ type: CreateSongDto })
  @ApiResponse({
    status: 201,
    description: 'Song successfully created.',
    type: Song,
  })
  create(
    @Body() createSongDto: CreateSongDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.songsService.create(createSongDto, file.path);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of songs', type: [Song] })
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'The ID of the song' })
  @ApiResponse({ status: 200, description: 'Song found', type: Song })
  @ApiResponse({ status: 404, description: 'Song not found' })
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Artist)
  @ApiParam({ name: 'id', description: 'The ID of the song' })
  @ApiBody({ type: UpdateSongDto })
  @ApiResponse({
    status: 200,
    description: 'Song successfully updated.',
    type: Song,
  })
  @ApiResponse({ status: 404, description: 'Song not found' })
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songsService.update(id, updateSongDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Artist)
  @ApiParam({ name: 'id', description: 'The ID of the song' })
  @ApiResponse({ status: 200, description: 'Song successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Song not found' })
  remove(@Param('id') id: string) {
    return this.songsService.remove(id);
  }

  @Get('stream/:id')
  @ApiParam({ name: 'id', description: 'The ID of the song' })
  @ApiResponse({ status: 200, description: 'Streaming song' })
  async stream(@Param('id') id: string, @Res() res: Response) {
    const song = await this.songsService.findOne(id);
    if (!song) {
      res.status(404).send('Song not found');
      return;
    }

    const filePath = join(process.cwd(), song.filePath);
    const file = createReadStream(filePath);
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': `inline; filename="${song.title}.mp3"`,
    });
    file.pipe(res);
  }
}
