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
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { ApiTags, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Like } from './entities/like.entity';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CreateLikeDto })
  @ApiResponse({
    status: 201,
    description: 'Song successfully liked.',
    type: Like,
  })
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of likes',
    type: [Like],
  })
  findAll() {
    return this.likesService.findAll();
  }

  @Get(':user/:song')
  @ApiParam({ name: 'user', description: 'The ID of the user' })
  @ApiParam({ name: 'song', description: 'The ID of the song' })
  @ApiResponse({ status: 200, description: 'Like found', type: Like })
  @ApiResponse({ status: 404, description: 'Like not found' })
  findOne(@Param('user') user: string, @Param('song') song: string) {
    return this.likesService.findOne(user, song);
  }

  @Patch(':user/:song')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @ApiParam({ name: 'user', description: 'The ID of the user' })
  @ApiParam({ name: 'song', description: 'The ID of the song' })
  @ApiBody({ type: UpdateLikeDto })
  @ApiResponse({
    status: 200,
    description: 'Like successfully updated.',
    type: Like,
  })
  @ApiResponse({ status: 404, description: 'Like not found' })
  update(
    @Param('user') user: string,
    @Param('song') song: string,
    @Body() updateLikeDto: UpdateLikeDto,
  ) {
    return this.likesService.update(user, song, updateLikeDto);
  }

  @Delete(':user/:song')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @ApiParam({ name: 'user', description: 'The ID of the user' })
  @ApiParam({ name: 'song', description: 'The ID of the song' })
  @ApiResponse({ status: 200, description: 'Like successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Like not found' })
  remove(@Param('user') user: string, @Param('song') song: string) {
    return this.likesService.remove(user, song);
  }
}
