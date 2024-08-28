import { Controller, Get, Param, Query } from '@nestjs/common';
import { DatasService } from './datas.service';
import { Throttle } from '@nestjs/throttler';
import { Throttles } from 'src/common/throttle';
import { JIDSBadRequest, JIDSNotFound } from 'src/common/exceptions';

// サブディレクトリに分けるがDataディレクトリはすでにあるので
// ルートからのコントローラーとする
@Controller('')
export class DatasController {
    // 
    constructor(private datasService: DatasService) { }

    @Get("")
    @Throttle({default: Throttles.info_get})
    async getPrefs(@Query("withArea") withArea: boolean = false, @Query("withIntersection") withIntersection: boolean = false): Promise<any> {
        const result = await this.datasService.getPref(undefined, withArea, withIntersection);
        return result;
    }

    /**
     * 指定した都道府県の情報を返す。
     * @param prefId 都道府県ID
     * @returns 
     */
    @Get(":prefId")
    @Throttle({default: Throttles.info_get})
    async getPref(
        @Param("prefId") prefId,
        @Query("withArea") withArea: boolean = false,
        @Query("withIntersection") withIntersection: boolean = false,
        @Query("withDetail") withDetail: boolean = false
    ): Promise<any> {
        // バリデーションチェック：prefIdが数値？
        if (isNaN(prefId)) {
            throw JIDSBadRequest("都道府県IDが不正です。");
        }
        const result = await this.datasService.getPref(parseInt(prefId), withArea, withIntersection, withDetail);
        if (result.length === 0) {
            throw JIDSNotFound("指定した都道府県は存在しません。");
        }
        return result[0];
    }

    /**
     * 
     * @param prefId 都道府県ID
     * @param areaId エリアID
     * @param withIntersection 交差点情報を含めるかどうか
     * @param withDetail 現地調査データを含めるかどうか
     */
    @Get(":prefId/:areaId")
    @Throttle({default: Throttles.info_get})
    async getArea(
        @Param("prefId") prefId,
        @Param("areaId") areaId,
        @Query("withIntersection") withIntersection: boolean = false,
        @Query("withDetail") withDetail: boolean = false
    ): Promise<any> {
        const result = await this.datasService.getArea(parseInt(prefId), parseInt(areaId), withIntersection, withDetail);
        if (Object.keys(result).length === 0) {
            throw JIDSNotFound("指定したエリアは存在しません。");
        }
        return result;
    }
}
