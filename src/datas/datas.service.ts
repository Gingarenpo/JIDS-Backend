import { Injectable } from '@nestjs/common';
import { Area, Intersection, Pref, PrismaClient } from '@prisma/client';

// 多分本来は都道府県とエリアと交差点分けるべきだけどとりあえず今は結合しちゃっている
@Injectable()
export class DatasService {

    private dbClient: PrismaClient = new PrismaClient();

    constructor() {}

    // 都道府県一覧を取得するメソッド
    // 第二引数と第三引数で各エリア・交差点情報を取得するが大変重い
    async findAllPref(withArea: boolean = false, withIntersection: boolean = false): Promise<Pref[]> {
        const prefs = await this.dbClient.pref.findMany({
            include: {
                area: withArea ? { include: { intersection: withIntersection ? { orderBy: {id: "asc"}} : false }, orderBy: {id: "asc"} } : false
            },
            orderBy: {
                id: "asc"
            }
        });

        return prefs;
    }

    // 都道府県を指定して情報を取得するメソッド
    // 第二引数にtrueを入れるとエリアも取得し、第三引数にtrueを入れると交差点も取得する
    // 第三引数まで入れるとクソ重い
    async findPref(id: number, withArea: boolean = false, withIntersection: boolean = false): Promise<Pref | null> {
        const pref = await this.dbClient.pref.findUnique({
            where: {
                id: id
            },
            include: {
                area: withArea ? { include: { intersection: withIntersection ? { orderBy: {id: "asc"}} : false }, orderBy: {id: "asc"} } : false
            }
        });

        return pref;
    }

    // エリア一覧を取得するメソッド
    // 都道府県を指定する必要はある
    async findAllArea(prefId: number, withIntersection: boolean = false): Promise<Area[]> {
        const areas = await this.dbClient.area.findMany({
            where: {
                prefId: prefId
            },
            include: {
                intersection: withIntersection ? { orderBy: {id: "asc"}} : false
            },
            orderBy: {
                id: "asc"
            }
        });
        return areas;
    }

    // エリア情報だけを取得するメソッド
    // 第二引数にtrueを入れると交差点も取得する
    async findArea(prefId: number, id: number, withIntersection: boolean = false): Promise<Area | null> {
        const area = await this.dbClient.area.findUnique({
            where: {
                prefId_id: {
                    id: id,
                    prefId: prefId
                },
            },
            include: {
                intersection: withIntersection ? { orderBy: {id: "asc"}} : false
            }
        }); 
        return area;
    }

    // 交差点情報を取得するメソッド
    // Todo: 情報提供追加したらその辺も取る
    async findIntersection(prefId:number, areaId: number, id: string): Promise<Intersection | null> {
        const intersection = await this.dbClient.intersection.findUnique({
            where: {
                areaId_id: {
                    id: id,
                    areaId: areaId
                },
                prefId: prefId,
            }
        });
        return intersection;
    }

    
}
