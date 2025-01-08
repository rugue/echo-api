import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { Like, LikeSchema } from './entities/like.entity';
import { UsersModule } from 'src/users/users.module';
import { SongsModule } from 'src/songs/songs.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
    UsersModule,
    SongsModule,
  ],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}
