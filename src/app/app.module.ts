import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth';
import { PostModule } from 'src/post';
import { S3Module } from 'src/s3';
import { UserModule } from 'src/user';

@Module({
  imports: [UserModule, PostModule, AuthModule, S3Module],
})
export class AppModule {}
