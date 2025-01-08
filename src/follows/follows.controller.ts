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
import { FollowsService } from './follows.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { ApiTags, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Follow } from './entities/follow.entity';

@ApiTags('follows')
@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CreateFollowDto })
  @ApiResponse({
    status: 201,
    description: 'Artist successfully followed.',
    type: Follow,
  })
  create(@Body() createFollowDto: CreateFollowDto) {
    return this.followsService.create(createFollowDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of follows',
    type: [Follow],
  })
  findAll() {
    return this.followsService.findAll();
  }

  @Get(':user/:artist')
  @ApiParam({ name: 'user', description: 'The ID of the user' })
  @ApiParam({ name: 'artist', description: 'The ID of the artist' })
  @ApiResponse({ status: 200, description: 'Follow found', type: Follow })
  @ApiResponse({ status: 404, description: 'Follow not found' })
  findOne(@Param('user') user: string, @Param('artist') artist: string) {
    return this.followsService.findOne(user, artist);
  }

  @Patch(':user/:artist')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @ApiParam({ name: 'user', description: 'The ID of the user' })
  @ApiParam({ name: 'artist', description: 'The ID of the artist' })
  @ApiBody({ type: UpdateFollowDto })
  @ApiResponse({
    status: 200,
    description: 'Follow successfully updated.',
    type: Follow,
  })
  @ApiResponse({ status: 404, description: 'Follow not found' })
  update(
    @Param('user') user: string,
    @Param('artist') artist: string,
    @Body() updateFollowDto: UpdateFollowDto,
  ) {
    return this.followsService.update(user, artist, updateFollowDto);
  }

  @Delete(':user/:artist')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @ApiParam({ name: 'user', description: 'The ID of the user' })
  @ApiParam({ name: 'artist', description: 'The ID of the artist' })
  @ApiResponse({ status: 200, description: 'Follow successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Follow not found' })
  remove(@Param('user') user: string, @Param('artist') artist: string) {
    return this.followsService.remove(user, artist);
  }
}
