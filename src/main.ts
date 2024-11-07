import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export let app: NestExpressApplication;

async function bootstrap() {
  app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 静的なAssetsを解釈する
  app.useStaticAssets(process.env.DATA_DIR, { prefix: process.env.DATA_PREFIX ?? "/Data" });

  // X-PoweredByを抹消する
  app.disable('x-powered-by');

  // CORS
  app.enableCors();

  // APIドキュメントを一応生成しておく
  const options = new DocumentBuilder()
    .setTitle("JIDS API Documents")
    .setDescription("自動生成されたJIDS APIドキュメントです。ソースメンテに伴いなるべくメタ情報は更新していますが、足りなかったり現状にそぐわなかったりするので最新の情報は直接ソースコードを見ていただくか実際に実行してもらうのが一番手っ取り早いです。")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document);

  await app.listen(3000, "0.0.0.0");

  // コンソールしておく
  console.log("JIDS-Backend is running on: " + (await app.getUrl()));
  
}
bootstrap();
