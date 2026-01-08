import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ValidatesService } from './validates.service';
import { Throttle } from '@nestjs/throttler';
import { Throttles } from 'src/common/throttle';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { ValidateSearchRequestDto, SearchDiff } from './validates.module';

/**
 * 各種検証用のAPI群
 */
@Controller('validates')
export class ValidatesController {
    constructor(private validatesService: ValidatesService) {}

    /**
     * JSONデータを受け取って、予備調査データのバリデーションチェックを行う
     * あっていればその中身の反映まで行う
     */
    @Post("search")
    @Throttle({default: Throttles.info_post})
    @ApiTags("情報提供")
    @ApiOperation({ summary: "JSONデータを受け取って、予備調査データのバリデーションチェックを行う" })
    @ApiResponse({ status: 200, description: "OK" })
    @UseGuards(AuthGuard)
    async checkSearchData(@Body() validateSearchRequestDto: ValidateSearchRequestDto): Promise<any> {
        // とりあえずそのままサービスに渡す
        const result = await this.validatesService.checkSearchData(validateSearchRequestDto);

        // 中身が全く問題なければそれをデータベースに登録する
        if (result.length == 0) {
            try {
                await this.validatesService.upsertSearchData(validateSearchRequestDto);
            } catch (e) {
                // SQL関連で例外が発生した場合はここに到達する
            }
        }
    }

}
