import { Controller, Get, StreamableFile } from '@nestjs/common';
import { StaticService } from './static.service';
import { createReadStream } from 'fs';
import { join } from 'path';

/**
 * 静的ファイルを解決するコントローラー
 * JIDSのDataディレクトリに関してはアセットファイルとして定義したが
 * それ以外の必要なファイル群に関してはここで管理する
 */
@Controller('static')
export class StaticController {

  constructor(private staticService: StaticService) { }

  @Get("thumbnail.gif")
  getBCRThumbnail() {
      const file = createReadStream(join(process.cwd(), "batch/thumbnail.gif"));
      return new StreamableFile(file);
  }

  @Get("detail.gif")
  getBCRDetail() {
    const file = createReadStream(join(process.cwd(), "batch/detail.gif"));
    return new StreamableFile(file);
}
}
