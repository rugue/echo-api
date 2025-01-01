import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';
import { PostsModule } from './posts/posts.module';
import { ArtistsModule } from './artists/artists.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/echo'),
    UsersModule,
    SettingsModule,
    PostsModule,
    ArtistsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
