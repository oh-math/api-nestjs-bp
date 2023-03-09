import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PostModule } from 'src/post';
import { UserModule } from 'src/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UserModule, PostModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
