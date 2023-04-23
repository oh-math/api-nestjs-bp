import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth';
import { PostModule } from 'src/post';
import { S3Module } from 'src/s3';
import { UserModule } from 'src/user';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UserModule, PostModule, AuthModule, S3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
