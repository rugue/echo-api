import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { ArtistsService } from 'src/artists/artists.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private artistsService: ArtistsService,
    private jwtService: JwtService,
  ) {}

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser({ email });
      const authenticated = await bcrypt.compare(password, user.password_hash);
      if (!authenticated) {
        throw new UnauthorizedException('Invalid password');
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid password', error);
    }
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
      role: user.role,
    };
    console.log('User in login:', user);
    return {
      access_token: this.jwtService.sign(payload),
    };
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
