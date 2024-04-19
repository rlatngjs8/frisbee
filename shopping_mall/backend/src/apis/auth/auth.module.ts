import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { AuthController } from './auth.controller';
import { JwtGoogleStrategy } from './strategies/jwt-social-google.strategy';
import { JwtNaverStrategy } from './strategies/jwt-social-naver.strategy';
import { JwtKakaoStrategy } from './strategies/jwt-social-kakao.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '../user-folder/user/users.module';

@Module({
  imports: [
    JwtModule.register({}), //
    UsersModule,
  ],
  providers: [
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    JwtNaverStrategy,
    JwtKakaoStrategy,
    AuthService, //
  ],
  controllers: [
    AuthController, //
  ],
})
export class AuthModule {}
