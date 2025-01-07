import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from './schemas/user.entity';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully created.',
    type: User,
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  async getUsers(@CurrentUser() user: User) {
    console.log(user);
    return this.usersService.getUsers();
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.usersService.findByEmail(id);
  // }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'The ID of the user' })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('User not found', 404);
    const findUser = await this.usersService.findById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiParam({ name: 'id', description: 'The ID of the user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully updated.',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Invalid ID' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updatedUser = await this.usersService.updateUser(
      { _id: id },
      updateUserDto,
    );
    if (!updatedUser) throw new HttpException('User not found', 404);
    return updatedUser;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @ApiParam({ name: 'id', description: 'The ID of the user' })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  @ApiResponse({ status: 400, description: 'Invalid ID' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const deletedUser = await this.usersService.remove(id);
    if (!deletedUser) throw new HttpException('User not found', 404);
    return; //this.usersService.remove(+id);
  }
}
