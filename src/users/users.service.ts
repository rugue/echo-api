import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.entity';
import { FilterQuery, Model } from 'mongoose';
import { UserSettings } from 'src/settings/schemas/UserSettings.schema';
import { Artist } from 'src/artists/entities/artist.entity';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
    @InjectModel(Artist.name) private artistModel: Model<Artist>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async getUser(query: FilterQuery<User>): Promise<User> {
    const user = (await this.userModel.findOne(query)).toObject();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findById(id: string): Promise<User> {
    return this.userModel
      .findById(id)
      .populate(['settings', 'posts', 'artist'])
      .exec();
  }
  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await hash(createUserDto.password, 10);
    // if (settings) {
    //   const newSettings = new this.userSettingsModel(settings);
    //   const savedNewSettings = await newSettings.save();
    //   // createUserDto.settings = newSettings;
    //   const newUser = new this.userModel({
    //     ...createUserDto,
    //     settings: savedNewSettings._id,
    //     password_hash: hashedPassword,
    //   });
    //   return newUser.save();
    // }
    const newUser = await new this.userModel({
      ...createUserDto,
      password_hash: hashedPassword,
    });
    return newUser.save();
  }

  async updateUser(
    query: FilterQuery<User>,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const updatedUser = await this.userModel
      .findOneAndUpdate(query, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  // async updateUser(query: FilterQuery<User>, data: UpdateQuery<User>) {
  //   return this.userModel.findOneAndUpdate(query, data);
  // }
  async getUsers(): Promise<User[]> {
    return this.userModel
      .find({})
      .populate(['settings', 'posts', 'artist'])
      .exec();
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
