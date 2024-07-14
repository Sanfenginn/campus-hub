import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.PORT_API);
}
bootstrap();

// app.setGlobalPrefix('api');
//添加全局前缀api
