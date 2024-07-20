import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/config';
import { ValidationPipe } from '@nestjs/common';
// import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.PORT_API);
}
bootstrap().then(() => {
    console.log(`Server is running on http://localhost:${config.PORT_API}`);
});
// app.setGlobalPrefix('api');
//添加全局前缀api
