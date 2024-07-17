import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/config';
import { ValidationPipe } from '@nestjs/common';
// import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 配置 CORS
  // app.enableCors({
  //   origin: '*', // 允许所有来源
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // 允许的请求方法
  //   allowedHeaders: 'Content-Type, Authorization', // 允许的请求头
  //   credentials: true, // 是否允许发送 Cookie
  // });

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.PORT_API);
}
bootstrap();

// app.setGlobalPrefix('api');
//添加全局前缀api
