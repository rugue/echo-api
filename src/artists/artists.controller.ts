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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { Artist } from './entities/artist.entity';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Artist)
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CreateArtistDto })
  @ApiResponse({
    status: 201,
    description: 'Artist successfully created.',
    type: Artist,
  })
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.createArtist(createArtistDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of artists', type: [Artist] })
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'The ID of the artist' })
  @ApiResponse({ status: 200, description: 'Artist found', type: Artist })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  findOne(@Param('id') id: string) {
    return this.artistsService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Artist)
  @ApiParam({ name: 'id', description: 'The ID of the artist' })
  @ApiBody({ type: UpdateArtistDto })
  @ApiResponse({
    status: 200,
    description: 'Artist successfully updated.',
    type: Artist,
  })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Artist)
  @ApiParam({ name: 'id', description: 'The ID of the artist' })
  @ApiResponse({ status: 200, description: 'Artist successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  remove(@Param('id') id: string) {
    return this.artistsService.remove(id);
  }
}
