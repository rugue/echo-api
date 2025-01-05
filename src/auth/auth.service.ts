import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { ArtistsService } from 'src/artists/artists.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/schemas/user.entity';
import { Response } from 'express';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly artistsService: ArtistsService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser({ email });
      const authenticated = await bcrypt.compare(password, user.password_hash);
      if (!authenticated) {
        throw new UnauthorizedException('Invalid password');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Credentials are not valid.', error);
    }
  }

  async login(user: User, response: Response) {
    const expiresAccessToken = new Date();
    expiresAccessToken.setMilliseconds(
      expiresAccessToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_MS',
          ),
        ),
    );

    const expiresRefreshToken = new Date();
    expiresRefreshToken.setMilliseconds(
      expiresRefreshToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION_MS',
          ),
        ),
    );

    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.getOrThrow(
        'JWT_ACCESS_TOKEN_EXPIRATION_MS',
      )}ms`,
    });

    // const refreshToken = this.jwtService.sign(tokenPayload, {
    //   secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
    //   expiresIn: `${this.configService.getOrThrow(
    //     'JWT_REFRESH_TOKEN_EXPIRATION_MS',
    //   )}ms`,
    // });

    // await this.usersService.updateUser(
    //   { _id: user._id },
    //   { $set: { refreshToken: await hash(refreshToken, 10) } },
    // );

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresAccessToken,
    });
  }

  async signUp(createUserDto: any) {
    // const hashedPassword = await bcrypt.hash(createUserDto.password_hash, 10);
    // const newUser = await this.usersService.createUser({
    //   ...createUserDto,
    //   password_hash: hashedPassword,
    // });

    return this.usersService.createUser(createUserDto);
  }
}
