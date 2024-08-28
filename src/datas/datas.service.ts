import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { glob } from 'glob';
import { app } from 'src/main';

@Injectable()
export class DatasService {
    // Prisma Client
    private client: PrismaClient = new PrismaClient();


    //////////////////////////////////////////////////////////
    // ヘルパーメソッド
    //////////////////////////////////////////////////////////

    /**
     * PrismaはUnsupportedとして、GEOMETRY型を扱うことができないので、
     * 指定したWHERE文で緯度経度だけを返す。
     * 存在しない交差点がある可能性があるので、必ずあるかどうかのチェックを行うこと
     */
    async getIntersectionLocations(prefId?: number, areaId?: number, intersectionId?: string): Promise<any> {
        // クエリを発行
        const query: Array<any> = await this.client.$queryRaw`
            SELECT
                "prefId",
                "areaId",
                id,
                ST_X(location::GEOMETRY) as x,
                ST_Y(location::GEOMETRY) as y
            FROM
                info.intersection
            ${prefId !== undefined || areaId !== undefined || intersectionId !== undefined ? Prisma.sql`WHERE` : Prisma.sql``}
            ${prefId ? Prisma.sql`"prefId" = ${Prisma.sql([prefId.toString()])}` : Prisma.sql``}
            ${prefId && areaId ? Prisma.sql`AND` : Prisma.sql``}
            ${areaId ? Prisma.sql`"areaId" = ${Prisma.sql([areaId.toString()])}` : Prisma.sql``}
            ${areaId && intersectionId ? Prisma.sql`AND` : Prisma.sql``}
            ${intersectionId ? Prisma.sql`id = ${Prisma.sql([intersectionId.toString()])}` : Prisma.sql``}
        `;

        // [][][]でアクセスできるように整える
        let result = {};
        for (let i = 0; i < query.length; i++) {
            const q = query[i];
            if (!result[q.prefId]) {
                result[q.prefId] = {};
            }
            if (!result[q.prefId][q.areaId]) {
                result[q.prefId][q.areaId] = {};
            }
            result[q.prefId][q.areaId][q.id] = {
                x: q.x,
                y: q.y
            };
            
        }

        return result;
    }

    /**
     * 都道府県の中心座標の緯度経度を返す。
     * prefIdがキーとなるオブジェクトで返されるのでそれで対応可能
     * @param prefId 指定するとその都道府県で絞り込む
     * @returns 
     */
    async getPrefCentroids(prefId?: number): Promise<any> {
        // クエリを発行
        const query: Array<any> = await this.client.$queryRaw`
            SELECT
                id,
                ST_X(centroid::GEOMETRY) as x,
                ST_Y(centroid::GEOMETRY) as y
            FROM
                core.pref
            ${prefId !== undefined ? Prisma.sql`WHERE` : Prisma.sql``}
            ${prefId ? Prisma.sql`"id" = ${Prisma.sql([prefId.toString()])}` : Prisma.sql``}
        `;

        // []でアクセスできるように整える
        let result = {};
        for (let i = 0; i < query.length; i++) {
            const q = query[i];
            result[q.id] = {
                x: q.x,
                y: q.y
            };
        }

        return result;
    }

    /**
     * 
     * @param prefId 都道府県ID。指定しないと全都道府県の全データから取得します。
     * @param areaId エリアID。指定しないと全都道府県の全交差点から取得します。
     * @param intersectionId 交差点ID。指定しないと全エリアの全交差点から取得します。
     */
    async getThumbnail(prefId?: number, areaId?: number, intersectionId?: string): Promise<any> {
        // ホストを取得
        const host = await app.getUrl();
        // パスを作成
        const path = `${process.env.DATA_DIR}${prefId ? prefId : '*'}/${areaId ? areaId : '*'}/${intersectionId ? intersectionId + ".JPG" : '*.JPG'}`;
        const imgs = (await glob(path)).map(path => host + process.env.DATA_PREFIX + path.replace(process.env.DATA_DIR, ''));
        return imgs.length === 0 ? null : imgs[Math.floor(Math.random() * imgs.length)];
    }

    /**
     * withIntersectionを指定していない場合、各種条件によってカウントを行い
     * そのオブジェクトを渡す。
     * prefIdは必須で、areaIdはオプションとなる。
     * 結果は、それぞれのカウントがキーと値で格納されたオブジェクトなので
     * 結合すればよろし。
     * 
     * @param prefId 都道府県ID
     * @param areaId エリアID
     */
    async getIntersectionCount(prefId: number, areaId?: number): Promise<Object> {
        const query: Array<any> = await this.client.$queryRaw`
            SELECT
                COUNT(*)::INTEGER AS all_count,
                COUNT((name IS NOT NULL OR status = 'UNKNOWN') OR NULL)::INTEGER AS search_count,
                COUNT(status = 'LIVE' AND name IS NOT NULL OR NULL)::INTEGER AS exist_count,
                COUNT(status = 'UNKNOWN' OR NULL)::INTEGER AS unknown_count,
                (
                    SELECT
                        COUNT(*)
                    FROM
                        (
                            SELECT
                                t0."prefId",
                                t0."areaId",
                                t0."intersectionId"
                            FROM
                                info.thumbnail t0
                            GROUP BY
                                t0."prefId",
                                t0."areaId",
                                t0."intersectionId"
                        ) AS t
                    WHERE
                        t."prefId" = i."prefId"
                        ${areaId ? Prisma.sql`AND t."areaId" = i."areaId"`: Prisma.sql``}
                    GROUP BY
                        t."prefId"
                        ${areaId ? Prisma.sql`, t."areaId"` : Prisma.sql``}
                )::INTEGER AS thumbnail_count,
                (
                    SELECT
                        COUNT(*)
                    FROM
                        (
                            SELECT
                                d0."prefId",
                                d0."areaId",
                                d0."intersectionId"
                            FROM
                                info.detail d0
                            GROUP BY
                                d0."prefId",
                                d0."areaId",
                                d0."intersectionId"
                        ) AS d
                    WHERE
                        d."prefId" = i."prefId"
                        ${areaId ? Prisma.sql`AND d."areaId" = i."areaId"`: Prisma.sql``}
                    GROUP BY
                        d."prefId"
                        ${areaId ? Prisma.sql`, d."areaId"` : Prisma.sql``}
                )::INTEGER AS detail_count
            FROM
                info.intersection i
            WHERE
                i."prefId" = ${Prisma.sql([prefId.toString()])}
                ${areaId ? Prisma.sql`AND` : Prisma.sql``}
                ${areaId ? Prisma.sql`i."areaId" = ${Prisma.sql([areaId.toString()])}` : Prisma.sql``}
            GROUP BY
                i."prefId"
                ${areaId ? Prisma.sql`, i."areaId"` : Prisma.sql``}
        `

        return query.length === 0 ? {
            all_count: 0,
            search_count: 0,
            exist_count: 0,
            unknown_count: 0,
            thumbnail_count: 0,
            detail_count: 0
        } : {...query[0], thumbnail_count: query[0].thumbnail_count ?? 0, detail_count: query[0].detail_count ?? 0};
    }

    //////////////////////////////////////////////////////////
    // Prismaクエリを構築するためのオブジェクトを返すメソッド
    // 共通化をできるだけ促進するためのもの、TypeScript理解したら適切な型にする
    //////////////////////////////////////////////////////////

    /**
     * エリア情報を渡す際のPrismaClientクエリ引数を発行する。
     * withDetailを指定するととてつもなく遅くなる（indexは指定しているが）
     * 
     * @param prefId 都道府県ID
     * @param areaId エリアID
     * @param withIntersection 交差点情報を含めるかどうか
     * @param withDetail 交差点の現地調査データ、サムネイルデータを含めるかどうか
     * @returns クエリパラメータ
     */
    prismaQueryArea(prefId?: number, areaId?: number, withIntersection?: boolean, withDetail?: boolean): Prisma.AreaFindManyArgs {
        // デフォルト値を設定
        withIntersection = withIntersection === undefined ? false : withIntersection;
        withDetail = withDetail === undefined ? false : withDetail;
        return {
            where: {
                prefId: prefId,
                id: areaId
            },
            select: {
                // prefIdいらん
                id: true,
                name: true,
                description: true,
                area: true,
                unknownStart: true,
                managed: true,
                intersection: withIntersection ? this.prismaQueryIntersections(undefined, undefined, undefined, withDetail) : false
            }
        }
    }

    /**
     * 交差点情報に関するクエリインプットを構築する。
     * 共通化できるところは共通化したいところ。
     * これ単体では入れ子になった交差点が取得できるので、その始末は別メソッドで行うべき。
     * 
     * @param prefId 都道府県ID
     * @param areaId エリアID
     * @param intersectionId 交差点ID
     * @param withDetail 現地調査データとサムネイルデータを取得するか
     * @returns 該当する設定を考慮したPrismaClientで使用できるクエリ引数
     */
    prismaQueryIntersections(prefId?: number, areaId?: number, intersectionId?: string, withDetail?: boolean): Prisma.IntersectionFindManyArgs {
        // デフォルト値はラストには設定できないみたいなのでここで設定する
        withDetail = withDetail === undefined ? false : withDetail;
        return {
            where: {
                prefId: prefId,
                areaId: areaId,
                id: intersectionId
            },
            omit: {
                prefId: true,
                areaId: true,
            },
            include: {
                cars: {
                    select: {
                        carCode: true,
                    }
                },
                peds: {
                    select: {
                        pedCode: true,
                    }
                },
                details: withDetail ? {
                    select: {
                        id: true,
                        takeDate: true,
                        comment: true,
                        memo: true,
                        queue: {
                            select: {
                                id: true,
                                userId: true,
                            }
                        }
                    },
                    orderBy: {
                        id: 'desc',
                    }
                } : false,
                thumbnails:  {
                    where: {
                        result: true,
                    },
                    select: {
                        id: true,
                        takeDate: true,
                        comment: true,
                        queue: {
                            select: {
                                id: true,
                                userId: true,
                            }
                        }
                    },
                    orderBy: {
                        id: 'desc',
                    }
                }
            }
        }
    }

    //////////////////////////////////////////////////////////
    // 返されるオブジェクト配列の整形
    //////////////////////////////////////////////////////////

    /**
     * エリア情報の内容を整形する。intersectionが含まれている場合、交差点情報も含めて整形する。
     * @param areas 整形したいエリア情報
     */
    async formatArea(prefId: number, areas: Array<any>): Promise<any> {
        return await Promise.all(areas.map(async (area) => {
            const count = await this.getIntersectionCount(prefId, area.id);
            
            // 交差点情報がある場合はそれも整形する
            return "intersection" in area ? {
                ...area,
                ...count,
                intersection: await this.formatIntersection(prefId, area.id, area.intersection),
                thumbnail: await this.getThumbnail(prefId, area.id),
            } : {...area, ...count, thumbnail: await this.getThumbnail(prefId, area.id)};
        }));
    }

    /**
     * 
     * @param prefId 都道府県ID
     * @param areaId エリアID
     * @param intersections 交差点オブジェクト
     * @returns 整形した交差点オブジェクト
     */
    async formatIntersection(prefId: number, areaId: number, intersections: Array<any>): Promise<any> {
        intersections = intersections.sort((a, b) => a.id - b.id);
        const locations = await this.getIntersectionLocations(prefId, areaId);
        return await Promise.all(intersections.map(async (intersection) => {
            return {
                ...intersection,
                // 灯器コードを整形
                cars: intersection.cars.map((car) => car.carCode),
                peds: intersection.peds.length > 0 && intersection.peds[0].pedCode != "-" ? intersection.peds.map((ped) => ped.pedCode) : [],
                location: locations[prefId][areaId][intersection.id],
            }
        }));
    }


    //////////////////////////////////////////////////////////
    // 実際のデータ取得
    //////////////////////////////////////////////////////////

    /**
     * 
     * @param prefId 都道府県ID
     * @param withArea エリア情報を含めるかどうか
     * @param withIntersection 交差点情報を含めるかどうか
     * @param withDetail 現地調査データとサムネイルデータを含めるかどうか
     */
    async getPref(prefId?: number, withArea: boolean = false, withIntersection: boolean = false, withDetail: boolean = false): Promise<any> {
        const centroids = await this.getPrefCentroids(prefId);
        let datas = await this.client.pref.findMany({
            where: {
                id: prefId,
            },
            include: {
                area: withArea ? this.prismaQueryArea(prefId, undefined, withIntersection, withDetail) : false
            }
        });

        // サムネイル情報と中心座標を入れる
        datas = await Promise.all(datas.map(async (data) => {
            const thumb = await this.getThumbnail(data.id);
            return {
                ...data,
                thumbnail: thumb,
            }
        }));

        // エリア情報をフォーマット
        if (withArea) {
            datas = await Promise.all(datas.map(async (data) => {
                return {
                    ...data,
                    area: await this.formatArea(data.id, data.area),
                    centroid: centroids[data.id],
                }
            }));
        }
        else {
            // エリア情報がないのでエリア情報をもとにした総合カウントを導入
            datas = await Promise.all(datas.map(async (data) => {
                const count = await this.getIntersectionCount(data.id);
                return {
                    ...data,
                    ...count
                };
            }))
        }
        return datas;
    }

    /**
     * エリア情報を取得する。全件取得はprefのほうでやるべし。
     * @param prefId 都道府県ID
     * @param areaId エリアID
     * @param withIntersection 交差点情報を含めるかどうか
     * @param withDetail 交差点の詳細情報を含めるかどうか
     */
    async getArea(prefId: number, areaId: number, withIntersection: boolean = false, withDetail: boolean = false): Promise<any> {
        let data = await this.client.area.findUnique({
            where: {
                prefId_id: {
                    prefId: prefId,
                    id: areaId,
                },
            },
            include: {
                intersection: withIntersection ? this.prismaQueryIntersections(prefId, areaId, undefined, withDetail) : false
            }
        });

        // エリアを整形
        if (withIntersection) {
            data = {
                ...data,
                intersection: await this.formatIntersection(prefId, areaId, data.intersection)
            };
        }
        else {
            // 交差点カウント情報を格納
            const count = await this.getIntersectionCount(prefId, areaId);
            data = {
                ...data,
                ...count
            };
        }


        return data;
        
    }
}
