import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaClient } from '@prisma/client';
import { config } from 'src/config';
import { PrismaService } from 'src/prisma';
import { UserModule } from 'src/user';
import { UserRepository } from 'src/user/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PassportModule,
    JwtModule.register({
      privateKey: config.JWT_SECRET_KEY,
      signOptions: { expiresIn: '15min' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    UserRepository,
    PrismaService,
    JwtStrategy,
    PrismaClient,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
