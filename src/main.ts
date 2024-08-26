import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'
import { INestApplication } from '@nestjs/common';

export let app: NestExpressApplication;

async function bootstrap() {
  app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 静的なAssetsを解釈する
  app.useStaticAssets(process.env.DATA_DIR, { prefix: process.env.DATA_PREFIX ?? "/Data" });

  // X-PoweredByを抹消する
  app.disable('x-powered-by');

  // CORS
  app.enableCors();
  await app.listen(3000, "0.0.0.0");

  // コンソールしておく
  console.log("JIDS-Backend is running on: " + (await app.getUrl()));
}
bootstrap();
