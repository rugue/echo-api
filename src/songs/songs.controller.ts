import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Res,
  ParseFilePipe,
  HttpStatus,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto, SongBodyDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import {
  ApiTags,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import { Song } from './entities/song.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Express } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FileSizeValidationPipe } from './pipes/file-size-validation.pipe';
import { FilesService } from 'src/files/files.service';
import { AlbumsService } from 'src/albums/albums.service';

@ApiTags('song')
@Controller('song')
export class SongsController {
  constructor(
    private readonly songsService: SongsService,
    private readonly filesService: FilesService,
    private readonly albumsService: AlbumsService,
    // private readonly filesService: FilesService,
  ) {}

  // @Post('upload')
  // @ApiBody({ type: SampleDto })
  // @UseInterceptors(FileInterceptor('file'))
  // @ApiConsumes('multipart/form-data')
  // firstUpload(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body() body: SampleDto,
  // ) {
  //   console.log({ file, body });
  // }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Artist)
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({ type: CreateSongDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Song successfully created.',
    type: Song,
  })
  @ApiConsumes('multipart/form-data')
  async uploadFile(
    @UploadedFile(new FileSizeValidationPipe(), new ParseFilePipe())
    file: Express.Multer.File,
    @Body() createSongDto: SongBodyDto,
  ) {
    // upload file with write file async and get file path

    const filePath = await this.filesService.upload(file);
    console.log({ file, createSongDto, filePath });

    // Validate album existence
    const album = await this.albumsService.findOne(
      createSongDto.album.toString(),
    );
    if (!album) {
      throw new Error('Album not found');
    }

    return this.songsService.create(createSongDto, filePath);
  }

  // @Post()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Artist)
  // @UseInterceptors(
  //   FileInterceptor('file', this.filesService.getMulterOptions()),
  // )
  // @ApiBody({ type: CreateSongDto })
  // @ApiResponse({
  //   status: 201,
  //   description: 'Song successfully created.',
  //   type: Song,
  // })
  // async create(
  //   @Body() createSongDto: CreateSongDto,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   if (!file) {
  //     throw new Error('File upload failed');
  //   }
  //   // Only allow specific file types
  //   if (!['.mp3', '.wav'].includes(extname(file.originalname).toLowerCase())) {
  //     throw new Error(
  //       'Invalid file format. Only .mp3 and .wav files are allowed.',
  //     );
  //   }

  //   const song = await this.songsService.create(createSongDto, file.path);
  //   return song;
  // }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of songs',
    type: [Song],
  })
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'The ID of the song' })
  @ApiResponse({
    status: 200,
    description: 'Song found',
    type: Song,
  })
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
  @ApiResponse({
    status: 200,
    description: 'Song successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Song not found' })
  remove(@Param('id') id: string) {
    return this.songsService.remove(id);
  }

  @Get('stream/:id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', description: 'The ID of the song' })
  @ApiResponse({ status: 200, description: 'Streaming song' })
  async stream(@Param('id') id: string, @Res() res: Response) {
    const song = await this.songsService.findOne(id);
    if (!song) {
      res.status(404).send('Song not found');
      return;
    }

    const filePath = join(process.cwd(), 'uploads', song.filePath);
    const file = createReadStream(filePath);
    file.on('error', () => {
      res.status(500).send('Error streaming file');
    });
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': `inline; filename="${song.title}.mp3"`,
    });
    file.pipe(res);
  }
}
