import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import * as helmet from 'helmet';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT_API') || 51003;
  app.enableCors({
    origin: ['https://campushub.sanfenginn.com', 'http://localhost:3000'], // 允许的源
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
}
bootstrap().then(() => {});

// app.setGlobalPrefix('api');
//添加全局前缀api
