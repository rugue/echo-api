import { Controller, Post, Body, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { User } from 'src/users/schemas/user.entity';
import { Response } from 'express';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.login(user, response);
    return tokens;
  }

  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User successfully signed up.' })
  @Post('signup')
  async signUp(@Body() createUserDto: any) {
    return this.authService.signUp(createUserDto);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  @ApiResponse({ status: 200, description: 'Token successfully refreshed.' })
  async refreshToken(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.login(user, response);
    return tokens;
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(
  //   @CurrentUser() user: User,
  //   @Res({ passthrough: true }) response: Response,
  // ) {
  //   await this.authService.login(user, response);
  // }
}
