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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { ApiTags, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Album } from './entities/album.entity';

@ApiTags('albums')
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Artist)
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CreateAlbumDto })
  @ApiResponse({
    status: 201,
    description: 'Album successfully created.',
    type: Album,
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of albums', type: [Album] })
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'The ID of the album' })
  @ApiResponse({ status: 200, description: 'Album found', type: Album })
  @ApiResponse({ status: 404, description: 'Album not found' })
  findOne(@Param('id') id: string) {
    return this.albumsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Artist)
  @ApiParam({ name: 'id', description: 'The ID of the album' })
  @ApiBody({ type: UpdateAlbumDto })
  @ApiResponse({
    status: 200,
    description: 'Album successfully updated.',
    type: Album,
  })
  @ApiResponse({ status: 404, description: 'Album not found' })
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Artist)
  @ApiParam({ name: 'id', description: 'The ID of the album' })
  @ApiResponse({ status: 200, description: 'Album successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  remove(@Param('id') id: string) {
    return this.albumsService.remove(id);
  }
}
