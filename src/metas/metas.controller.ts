import { Controller, Get } from '@nestjs/common';
import { app } from 'src/main';
import { MetasService } from './metas.service';
import { execSync } from 'child_process';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('metas')
export class MetasController {

    constructor(private metasService: MetasService) {}

    /**
     * サーバーのメタ情報を返す。だれでも閲覧することができる。
     * @returns メタ情報
     */
    @Get("")
    @ApiTags("メタ情報")
    @ApiOperation({ summary: "サーバーのメタ情報を取得" })
    @ApiResponse({ status: 200, description: "メタ情報" })
    async getInfo() {
        // DBから取得できるもの系
        const d = await this.metasService.getInfo();
        const stdout = execSync(`find ${process.env.DATA_DIR} -name *.JPG | wc -l`).toString();
        return {
            nodeJSVersion: process.versions.node, // NodeJSのバージョン
            JIDSVersion: process.env.npm_package_version, // JIDSパッケージのバージョン
            JIDSHost: await app.getUrl(), // ホスト名
            pictureCount: parseInt(stdout), // 画像枚数
            ...d[0],
        };
    }
}
