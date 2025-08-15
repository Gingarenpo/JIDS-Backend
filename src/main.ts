import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';

export let app: NestExpressApplication;

async function bootstrap() {
  app = await NestFactory.create<NestExpressApplication>(AppModule);

  // X-PoweredByを抹消する
  app.disable('x-powered-by');

  // CORS
  app.enableCors();

  // APIドキュメントを一応生成しておく
  const options = new DocumentBuilder()
    .setTitle("JIDS API Documents")
    .setDescription(
      "自動生成されたJIDS APIドキュメントです。\
      ソースメンテに伴いなるべくメタ情報は更新していますが、\
      足りなかったり現状にそぐわなかったりするので\
      最新の情報は直接ソースコードを見ていただくか実際に実行してもらうのが一番手っ取り早いです。\
      <br>\
      一応試せるようになっているようですがフィールドの設定を何もしていないので全部のフィールドがRequiredとかになっています。"
    )
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document);

  // 静的なAssetsを解釈する
  // ただし一部はControllerを使用しているため、該当する者はそちらを使うように調整する
  app.use(process.env.DATA_PREFIX ?? "/Data", async (req, res, next) => {
    // 特定パターンはController優先
    if (/\/\d+\/\d+\/[^/]+\.JPG$/i.test(req.path)) {
      return next('route');  // 静的ファイルをスキップしてControllerへ
    }

    // 存在しない場合はそのまま次のルーティングへ
    next();
  })

  await app.listen(3000, "0.0.0.0");

  // コンソールしておく
  console.log("JIDS-Backend is running on: " + (await app.getUrl()));
  
}
bootstrap();
