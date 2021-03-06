import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
import { AuthStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/User';

@Module({
  imports: [
    PassportModule.registerAsync({useFactory: () => (config.get('passport'))}),
    JwtModule.registerAsync({ useFactory: () => (config.get('jwt'))}),
    TypeOrmModule.forFeature([User]),
    UserModule,
  ],
  providers: [AuthService, AuthStrategy, UserService],
  controllers: [AuthController],
  exports: [AuthStrategy],
})
export class AuthModule {}