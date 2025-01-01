import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';
import { PostsModule } from './posts/posts.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/echo'),
    UsersModule,
    SettingsModule,
    PostsModule,
    ArtistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
