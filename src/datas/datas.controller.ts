import { Controller, Get, Query, Param } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Throttles } from 'src/common/throttle';
import { DatasService } from './datas.service';
import { JIDSNotFound } from 'src/common/exceptions';

@Controller('datas')
export class DatasController {
    constructor(private datasService: DatasService) {}

    // 全都道府県を取得するメソッド
    @Get("")
    @Throttle({default: Throttles.info_get})
    async getAllPrefs(@Query("withArea") withArea?, @Query("withIntersection") withIntersection?) {
        const prefs = await new DatasService().findAllPref(withArea, withIntersection);
        return prefs;
    }

    // 全交差点を取得するメソッド
    // 大量にヒットするため通信量に注意
    // というか、通常使わない
    @Get("intersections")
    @Throttle({default: Throttles.info_get_many})
    async getAllIntersections(@Param("withDetails") withDetails?) {
        const intersections = await new DatasService().findAllIntersection(withDetails);
        return intersections;
    }

    // 交差点を検索するメソッド
    // 引数が多すぎるがPOSTだとCRUDに反するのでGETで頼みます
    @Get("search")
    @Throttle({default: Throttles.info_get})
    async searchIntersection(
        // クエリパラメータとして受け取ったものを条件とする
        @Query("name") name?, // 交差点名
        @Query("road") road?, // 道路名
        @Query("status") status?, // 交差点の状態
        @Query("sign") sign?, // 地名板名称（注意：NULLはそもそも引っかからなくなります）
        @Query("isOfficialName") isOfficialName?, // 公式名称か？
        @Query("decideYear") decideYear?, // 意思決定年度（指定するとNULLは引っ掛からなくなります）
        @Query("operationYear") operationYear?, // 新設年度（指定するとNULLは引っ掛からなくなります）
        @Query("refreshYear") refreshYear?, // 最終更新年度（指定するとNULLは引っ掛からなくなります）
        @Query("rover") rover?, // ルーバー？
        @Query("sound") sound?, // 音響？
        @Query("comment") comment?, // 備考欄含有検索
        @Query("cars") cars?, // 車灯コード
        @Query("peds") peds?, // 歩灯コード

        // 取得後に絞り込むもの
        @Query("name") searched?, // 予備調査済みのものを絞る場合はtrue、そうでない場合はfalse
        @Query("name") hasThumbnail?, // 画像ありのもののみを絞る場合はtrue、そうでない場合はfalse
        @Query("name") hasDetail?, // 現地調査済みのもののみを絞る場合はtrue、そうでない場合はfalse
        
        // 出力操作
        @Query("name") withDetails?, // 現地調査情報を含める
        @Query("name") withThumbnails?, // 画像情報を含める
    ) {

        // パラメータはすべて文字列になってしまうので適切な型に変換しておく
        if (searched) searched = searched === "true";
        if (hasThumbnail) hasThumbnail = hasThumbnail === "true";
        if (hasDetail) hasDetail = hasDetail === "true";
        if (withDetails) withDetails = withDetails === "true";
        if (withThumbnails) withThumbnails = withThumbnails === "true";
        if (isOfficialName) isOfficialName = isOfficialName === "true";

        // 配列型にするヤツはカンマ区切りで配列に変更
        if (cars) cars = cars.split(",");
        if (peds) peds = peds.split(",");
        if (comment) comment = comment.split(",");

        const intersections = await new DatasService().searchIntersection(
            name, road, status, sign, isOfficialName, decideYear, operationYear, refreshYear, rover, sound, comment, cars, 
            peds, searched, hasThumbnail, hasDetail, withDetails, withThumbnails
        );
        return intersections;
    }

    // 都道府県を取得するメソッド
    // 特にユーザーの認証いらないがレートはつける
    @Get(":id")
    @Throttle({default: Throttles.info_get})
    async getPref(@Param("id") id:string, @Query("withArea") withArea?, @Query("withIntersection") withIntersection?) {
        const pref = await new DatasService().findPref(parseInt(id), withArea, withIntersection);
        if (!pref) {
            throw JIDSNotFound("都道府県が見つかりません。");
        }

        return pref;
    }

    // ある都道府県の全エリアを取得するメソッド
    // URLが少し特殊なので注意
    @Get(":prefId/all")
    @Throttle({default: Throttles.info_get})
    async getAllAreas(@Param("prefId") prefId:string, @Query("withIntersection") withIntersection?) {
        const areas = await new DatasService().findAllArea(parseInt(prefId), withIntersection);
        return areas;
    }

    // エリアを取得するメソッド
    // 都道府県は取りたくないあなたに
    @Get(":prefId/:areaId")
    @Throttle({default: Throttles.info_get})
    async getArea(@Param("prefId") prefId:string, @Param("areaId") areaId:string, @Query("withIntersection") withIntersection?, @Query("withDetails") withDetails?) {
        const area = await new DatasService().findArea(parseInt(prefId), parseInt(areaId), withIntersection, withDetails);
        if (!area) {
            throw JIDSNotFound("エリアが見つかりません。");
        }

        return area;
    }

    // 交差点を取得するメソッド（単独）
    @Get(":prefId/:areaId/:intersectionId")
    @Throttle({default: Throttles.info_get})
    async getIntersection(@Param("prefId") prefId:string, @Param("areaId") areaId:string, @Param("intersectionId") intersectionId:string) {
        const intersection = await new DatasService().findIntersection(parseInt(prefId), parseInt(areaId), intersectionId);
        if (!intersection) {
            throw JIDSNotFound("交差点が見つかりません。");
        }

        return intersection;
    }
}
