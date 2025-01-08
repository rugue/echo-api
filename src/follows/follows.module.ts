import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowsService } from './follows.service';
import { FollowsController } from './follows.controller';
import { Follow, FollowSchema } from './entities/follow.entity';
import { UsersModule } from 'src/users/users.module';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }]),
    UsersModule,
    ArtistsModule,
  ],
  controllers: [FollowsController],
  providers: [FollowsService],
  exports: [FollowsService],
})
export class FollowsModule {}
