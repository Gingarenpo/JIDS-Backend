import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import { DatasService } from './datas.service';
import { Throttle } from '@nestjs/throttler';
import { Throttles } from 'src/common/throttle';
import { JIDSBadRequest, JIDSInternalServerError, JIDSNotFound, JIDSRequestTimeOut } from 'src/common/exceptions';
import { AuthGuard } from 'src/auth/auth.guard';

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

    @Get("search")
    @Throttle({default: Throttles.info_get_many})
    async searchIntersection(
        @Res() response,
        @Query("road") road?: string,
        @Query("name") name?: string,
        @Query("sign") sign?: string,
        @Query("status") status?: string,
        @Query("comment") comment?: string,
        @Query("operationYear") operationYear?: string,
        @Query("refreshYear") refreshYear?: string,
        @Query("decideYear") decideYear?: string,
        @Query("rover") rover?: number,
        @Query("sound") sound?: boolean,
        @Query("official") official?: boolean,
        @Query("thumbnail") thumbnail?: boolean,
        @Query("detail") detail?: boolean,
        @Query("car") car?: string,
        @Query("ped") ped?: string,
    ) {
        // 検索結果を何も絞らないでたたいた場合、全交差点が出てきてしまい時間ばかりかかるので
        // その場合強制終了
        if (Array.from(arguments).filter((x) => x != undefined && x != null).length == 0) {
            throw JIDSBadRequest("検索条件を指定してください。");
        }

        // クエリパラメータの整形
        const cars = car?.split(",").map((x) => x.trim());
        const peds = ped?.split(",").map((x) => x.trim());

        // Year関連をstartとendに分ける
        const operationYears = operationYear?.split("～");
        const refreshYears = refreshYear?.split("～");
        const decideYears = decideYear?.split("～");
        // できるだけハードコーディングは避けたいがとりあえず9999年まで継続しているはずがないので…
        let operationYearStart, operationYearEnd, refreshYearStart, refreshYearEnd, decideYearStart, decideYearEnd;
        if (operationYears?.length == 1) {
            operationYearStart = parseInt(operationYears[0]);
            operationYearEnd = parseInt(operationYears[0]);
        }
        else {
            operationYearStart = operationYears?.[0] ? parseInt(operationYears?.[0]) : 0;
            operationYearEnd = operationYears?.[1] ? parseInt(operationYears?.[1]) : 9999;
        }
        if (refreshYears?.length == 1) {
            refreshYearStart = parseInt(refreshYears[0]);
            refreshYearEnd = parseInt(refreshYears[0]);
        }
        else {
            refreshYearStart = refreshYears?.[0] ? parseInt(refreshYears?.[0]) : 0;
            refreshYearEnd = refreshYears?.[1] ? parseInt(refreshYears?.[1]) : 9999;
        }
        if (decideYears?.length == 1) {
            decideYearStart = parseInt(decideYears[0]);
            decideYearEnd = parseInt(decideYears[0]);
        }
        else {
            decideYearStart = decideYears?.[0] ? parseInt(decideYears?.[0]) : 0;
            decideYearEnd = decideYears?.[1] ? parseInt(decideYears?.[1]) : 9999;
        }

        // クエリを発行
        const intersections: any = await Promise.race([
            this.datasService.searchIntersection(
                road,
                name,
                sign,
                status,
                comment,
                operationYearStart,
                operationYearEnd,
                refreshYearStart,
                refreshYearEnd,
                decideYearStart,
                decideYearEnd,
                rover,
                sound,
                official,
                thumbnail,
                detail,
                cars,
                peds
            ),
            new Promise((resolve) => setTimeout(() => resolve(null), 10000)),
        ]);
        if (intersections == null) {
            throw JIDSRequestTimeOut("検索結果が多すぎます。リクエストがタイムアウトしました。");
        }
        if ("error" in intersections) {
            response.status(400).send(intersections);
        }
        if (intersections.length == 0) {
            return response.status(200).send([]);
        }
        return response.status(200).send(intersections);
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
        if (result == null || Object.keys(result).length === 0) {
            throw JIDSNotFound("指定したエリアは存在しません。");
        }
        return result;
    }

    @Get(":prefId/:areaId/:intersectionId")
    @Throttle({default: Throttles.info_get})
    async getIntersection(
        @Param("prefId") prefId,
        @Param("areaId") areaId,
        @Param("intersectionId") intersectionId,
        @Query("withDetail") withDetail: boolean = false
    ): Promise<any> {
        const result = await this.datasService.getIntersection(parseInt(prefId), parseInt(areaId), intersectionId, withDetail);
        if (Object.keys(result).length === 0) {
            throw JIDSNotFound("指定した交差点は存在しません。");
        }
        return result;
    }
}
