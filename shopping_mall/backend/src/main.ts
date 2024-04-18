import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 검증하기 전 파이프 거쳐서 통과한것만 들어가도록
  app.useGlobalPipes(new ValidationPipe());

  // 에러필터
  app.useGlobalFilters(new HttpExceptionFilter());

  // 결제 cors 활성화(배포시에 url 변경)
  app.enableCors({
    origin: 'http://localhost:3000', // 허용할 origin (url 확인하고 수정)
    methods: ['GET', 'POST'], // 허용할 HTTP 메서드
    allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
    credentials: true, // 요청에서 자격 증명을 허용합니다.
  });

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Swagger-tutorial') //
    .setDescription('user API description') //
    .setVersion('1.0') //
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
