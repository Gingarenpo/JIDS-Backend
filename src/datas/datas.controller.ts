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
    async getArea(@Param("prefId") prefId:string, @Param("areaId") areaId:string, @Query("withIntersection") withIntersection?) {
        const area = await new DatasService().findArea(parseInt(prefId), parseInt(areaId), withIntersection);
        if (!area) {
            throw JIDSNotFound("エリアが見つかりません。");
        }

        return area;
    }

    // 交差点を取得するメソッド（単独）
    // Todo: なんか詳細とか追加したらここ書き換える
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
