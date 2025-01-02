import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { ArtistsService } from 'src/artists/artists.service';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/users/schemas/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private artistsService: ArtistsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password_hash))) {
      const { password_hash, ...result } = (user as UserDocument).toObject();
      return result;
    }
    return null;
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
    const hashedPassword = await bcrypt.hash(createUserDto.password_hash, 10);
    const newUser = await this.usersService.createUser({
      ...createUserDto,
      password_hash: hashedPassword,
    });

    return newUser;
  }
}
