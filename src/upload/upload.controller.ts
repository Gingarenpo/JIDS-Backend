import { Controller, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { Throttle } from '@nestjs/throttler';
import { Throttles } from 'src/common/throttle';
import { FileInterceptor } from '@nestjs/platform-express';
import { JIDSBadRequest } from 'src/common/exceptions';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('upload')
export class UploadController {

    constructor(private uploadService: UploadService) { }


    /**
     * Zipファイルを処理し、キューに登録する責務を負う
     * @param file fileという名前のフィールドで渡されたアップロードファイル
     */
    @Post("/")
    @Throttle({default: Throttles.info_post})
    @UseInterceptors(FileInterceptor("file"))
    @ApiTags("情報提供")
    @ApiOperation({ summary: "キュー登録するためのZipファイルをアップロードする" })
    @ApiResponse({ status: 200, description: "アップロードされ登録されたキューの情報" })
    @UseGuards(AuthGuard)
    async uploadZip(@Req() request, @UploadedFile() file: Express.Multer.File, @Param("comment") comment:string) {
        if (file === undefined) {
            // ファイルが送られてきていない
            throw JIDSBadRequest("ファイルが送信されていません。");
        }
        // 処理はサービスに委譲する
        return this.uploadService.processZip(request.user, file, comment);
    }
}
