import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModel } from './user/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@mongo.zi5h386.mongodb.net/?retryWrites=true&w=majority',
    ),
    UsersModel,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
