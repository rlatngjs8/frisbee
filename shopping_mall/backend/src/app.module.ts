import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './apis/user-folder/user/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql', // 디비 종류 선택
      host: process.env.DATABASE_HOST, // 연결할 호스트
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE, // 디비이름
      entities: [__dirname + '/apis/**/*.entity.*'], // 테이블들 배열로
      synchronize: true, // 엔티티랑 디비랑 동기화해야 표로 만들어짐
      logging: true, // sql구문이 어떻게 나가는지 확인
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
