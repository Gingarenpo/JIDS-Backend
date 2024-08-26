import { Injectable } from '@nestjs/common';
import { Area, Intersection, IntersectionStatus, Pref, PrismaClient } from '@prisma/client';
import { createURLFromFilePath } from 'src/common/helper';
import { execSync } from 'child_process';
import { app } from 'src/main';

// TODO: エリアなどで指定した中でもcarsとpedを名前の配列にする

// 多分本来は都道府県とエリアと交差点分けるべきだけどとりあえず今は結合しちゃっている
@Injectable()
export class DatasService {

    private DATA_DIR = process.env.DATA_DIR;

    private dbClient: PrismaClient = new PrismaClient({});

    constructor() {}

    // 都道府県一覧を取得するメソッド
    // 第二引数と第三引数で各エリア・交差点情報を取得するが大変重い
    // とくに第三引数は返ってこないので指定すべきではない
    // 何も指定しない場合、エリアのカウントを返すし、第二引数だけ指定してある場合は交差点のカウントを返す
    async findAllPref(withArea: boolean = false, withIntersection: boolean = false): Promise<Pref[]> {
        let prefs;
        const url = await app.getUrl();
        if (withIntersection) {
            prefs = await this.dbClient.pref.findMany({
                include: {
                    area: withArea ? {
                        include: {
                            intersection: {
                                include: {
                                    cars: { select: { carCode: true }},
                                    peds: { select: { pedCode: true }},
                                },
                                orderBy: {id: "asc"}
                            }
                        },
                        orderBy: {id: "asc"}
                    } : false
                },
                orderBy: {
                    id: "asc"
                }
            });

            prefs = prefs.map(pref => {
                return {
                    ...pref,
                    area: pref.area.map(area => {
                        return {
                            ...area,
                            intersection: area.intersection.map(intersection => {
                                return {
                                    ...intersection,
                                    cars: intersection.cars.map(car => car.carCode),
                                    peds: intersection.peds.map(ped => ped.pedCode),
                                }
                            }),
                        }
                    }),
                }
            })
        }
        else {
            prefs = await this.dbClient.pref.findMany({
                include: {
                    area: withArea ? {
                        include: {
                            _count: {
                                select: { intersection: true }
                            }
                        },
                        orderBy: {id: "asc"}
                    } : false,
                    _count: !withArea ? { select: { area: true } } : false,
                },
                orderBy: {
                    id: "asc"
                }
            });

            if (!withArea) {
                // TODO: RAWSQLできれば使いたくないので解決策を模索したい
                // 交差点のカウント情報をSQLを用いて取得する
                const meta = await this.dbClient.$queryRaw`
                    SELECT
                        p."id",
                        -- 検索済みの交差点のカウント（行方不明除く）
                        COUNT((i.name IS NOT NULL OR i.status = 'UNKNOWN') OR NULL)::INTEGER AS search_count,
                        -- 未調査含む現時点のカウント
                        COUNT(i.id)::INTEGER AS all_count,
                        -- 現存している交差点のカウント
                        COUNT(i.status = 'LIVE' AND i.name IS NOT NULL OR NULL)::INTEGER AS exist_count,
                        -- サムネイルを撮影済みのカウント
                        COUNT((SELECT TRUE FROM info.thumbnail t WHERE i."prefId" = t."prefId" AND i."areaId" = t."areaId" AND i."id" = t."intersectionId" GROUP BY t."prefId", t."areaId", t."intersectionId") OR NULL)::INTEGER AS thumbnail_count,
                        -- 現地調査済みのカウント
                        COUNT((SELECT TRUE FROM info.detail d WHERE i."prefId" = d."prefId" AND i."areaId" = d."areaId" AND i."id" = d."intersectionId" GROUP BY d."prefId", d."areaId", d."intersectionId") OR NULL)::INTEGER AS detail_count
                    FROM
                        core.pref p
                    LEFT OUTER JOIN
                        info.intersection i
                    ON
                        p."id" = i."prefId"
                    GROUP BY
                        p.id
                    ORDER BY
                        p.id
                `;

                // エリアのカウントがネストになるのでそれをどうにかする
                prefs = prefs.map(pref => {
                    return {
                        ...pref,
                        area_count: pref._count.area, // ネストしちゃっているのでカウントだけにする
                        _count: undefined, // 消す
                        ...meta[pref.id - 1],
                    }
                })
            }
            else {
                // 交差点のカウントがネストになるのでそれをどうにかする
                prefs = prefs.map(pref => {
                    return {
                        ...pref,
                        area: pref.area.map(area => {
                            return {
                                ...area,
                                intersection_count: area._count.intersection,
                                _count: undefined
                            }
                        }),
                    }
                })
            }
        }

        // IO関連：prefsの中身において、画像を取得しそのパスを載せる
        prefs = await prefs.map((pref) =>{
            const img = this.getRandomImage(pref.id);
            return {
                
                ...pref,
                thumbnail: img != null ? url + createURLFromFilePath(img) : null,
            }
        })

        return prefs;
    }

    // 都道府県を指定して情報を取得するメソッド
    // 第二引数にtrueを入れるとエリアも取得し、第三引数にtrueを入れると交差点も取得する
    // 第三引数まで入れるとクソ重い
    async findPref(id: number, withArea: boolean = false, withIntersection: boolean = false, withDetails: boolean = false): Promise<Pref | null> {
        const url = await app.getUrl();
        let pref;
        if (withIntersection) {
            pref = await this.dbClient.pref.findUnique({
                where: {
                    id: id
                },
                include: {
                    area: withArea ? {
                        include: {
                            intersection: {
                                orderBy: {id: "asc"},
                                include: {
                                    cars: {
                                        select: {
                                            carCode: true
                                        }
                                    },
                                    peds: {
                                        select: {
                                            pedCode: true
                                        }
                                    },
                                    details: withDetails ? {
                                        orderBy: {
                                            id: "desc"
                                        },
                                    } : false,
                                    thumbnails: withDetails ? {
                                        orderBy: {
                                            id: "desc"
                                        },
                                    } : false,
                                }
                            }
                        },
                        orderBy: {
                            id: "asc"
                        }
                    } : false
                }
            });
            pref.area = pref.area.map(area => {
                return {
                    ...area,
                    intersection: area.intersection.map(intersection => {
                        return {
                            ...intersection,
                            cars: intersection.cars.map(car => car.carCode),
                            peds: intersection.peds.map(ped => ped.pedCode),
                        }
                    }),
                }
            })
        }

        else {
            pref = await this.dbClient.pref.findUnique({
                where: {
                    id: id
                },
                include: {
                    area: withArea ? {
                        orderBy: {
                            id: "asc"
                        }
                    } : false
                }
            });
        }


        if (withArea && !withIntersection) {
            // TODO: RAWSQLできれば使いたくないので解決策を模索したい
            // 交差点のカウント情報をSQLを用いて取得する
            const meta = await this.dbClient.$queryRaw`
                SELECT
                    a."id",
                    -- 検索済みの交差点のカウント（行方不明除く）
                    COUNT((i.name IS NOT NULL OR i.status = 'UNKNOWN') OR NULL)::INTEGER AS search_count,
                    -- 未調査含む現時点のカウント
                    COUNT(i.id)::INTEGER AS all_count,
                    -- 現存している交差点のカウント
                    COUNT(i.status = 'LIVE' AND i.name IS NOT NULL OR NULL)::INTEGER AS exist_count,
                    -- サムネイルを撮影済みのカウント
                    COUNT((SELECT TRUE FROM info.thumbnail t WHERE i."prefId" = t."prefId" AND i."areaId" = t."areaId" AND i."id" = t."intersectionId" GROUP BY t."prefId", t."areaId", t."intersectionId") OR NULL)::INTEGER AS thumbnail_count,
                    -- 現地調査済みのカウント
                    COUNT((SELECT TRUE FROM info.detail d WHERE i."prefId" = d."prefId" AND i."areaId" = d."areaId" AND i."id" = d."intersectionId" GROUP BY d."prefId", d."areaId", d."intersectionId") OR NULL)::INTEGER AS detail_count
                FROM
                    core.area a
                LEFT OUTER JOIN
                    info.intersection i
                ON
                    a."prefId" = i."prefId"
                AND a."id" = i."areaId"
                WHERE
                    a."prefId" = ${id}
                GROUP BY
                    a.id
                ORDER BY
                    a.id
            `;

            pref.area = pref.area.map((area, i) => {
                return {
                    ...area,
                    ...meta[i],
                }
            })
        }

        // IO関連：prefの中身において、画像を取得しそのパスを載せる
        pref.area = await pref.area.map((area) =>{
            const img = this.getRandomImage(id, area.id);
            return {
                ...area,
                thumbnail: img != null ? url + createURLFromFilePath(img) : null,
            }
        })

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
    // 第三引数にtrueを入れるとサムネや現地調査データも取得する
    // TypeScriptの仕様上if文にしないと死ぬ
    async findArea(prefId: number, id: number, withIntersection: boolean = false, withDetails: boolean = false): Promise<Area | null> {
            let area;
            if (withIntersection) {
                area = await this.dbClient.area.findUnique({
                    where: {
                        prefId_id: {
                            id: id,
                            prefId: prefId
                        },
                    },
                    include: {
                        intersection: { 
                            orderBy: {
                                id: "asc"
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
                                details: withDetails ? {
                                    orderBy: {
                                        id: "desc"
                                    }
                                } : false,
                                thumbnails: withDetails ? {
                                    orderBy: {
                                        id: "desc"
                                    }
                                } : false,
                            }
                        }
                    }
                });

                area = {
                    ...area,
                    intersection: area?.intersection.map(x => {
                        return {
                            ...x,
                            cars: x?.cars.map(x => x.carCode),
                            peds: x?.peds.map(x => x.pedCode)
                        }
                    })
                }
            }
            else {
                area = await this.dbClient.area.findUnique({
                    where: {
                        prefId_id: {
                            id: id,
                            prefId: prefId
                        },
                    },
                    
                });
            }

        return area;
    }

    // 交差点情報を取得するメソッド（1つだけ）
    async findIntersection(prefId:number, areaId: number, id: string): Promise<Intersection | null> {
        const intersection = await this.dbClient.intersection.findUnique({
            where: {
                prefId_areaId_id: {
                    id: id,
                    prefId: prefId,
                    areaId: areaId
                }
            },
            include: {
                cars: {
                    select: {
                        carCode: true
                    }
                },
                peds: {
                    select: {
                        pedCode: true
                    }
                },
                details: true,
                thumbnails: true,
            }
        });

        // car, pedは配列にする
        const intersectionResult = {
            ...intersection,
            cars: intersection?.cars.map(x => x.carCode),
            peds: intersection?.peds.map(x => x.pedCode)
        };
        
        return intersectionResult;
    }


    // ※通常使わない
    // 全交差点を取得するメソッド
    async findAllIntersection(withDetails: boolean = false): Promise<Intersection[]> {
        const intersections = await this.dbClient.intersection.findMany({
            include: {
                cars: {
                    select: {
                        carCode: true
                    }
                },
                peds: {
                    select: {
                        pedCode: true
                    }
                },
                details: withDetails ? {
                    orderBy: {
                        id: "desc"
                    }
                } : false,
                thumbnails: withDetails ? {
                    orderBy: {
                        id: "desc"
                    }    
                } : false,
            }
        });

        const intersectionResult = intersections.map(intersection => {
            return {
                ...intersection,
                cars: intersection?.cars.map(x => x.carCode),
                peds: intersection?.peds.map(x => x.pedCode)
            }
        });
        
        return intersectionResult;
    }


    // 交差点検索用メソッド
    // withDetailsとwithThumbnailsを指定すると鬼恐ろしいほど時間かかる
    // 検索条件はおいおい追加予定
    // なお、prefIdとareaIdでの絞りは行わない
    async searchIntersection(
        name?: string, // 交差点名
        road?: string, // 道路名
        status?: IntersectionStatus[], // 交差点の状態
        sign?: string, // 地名板名称（注意：NULLはそもそも引っかからなくなります）
        isOfficialName?: boolean, // 公式名称か？
        decideYear?: number, // 意思決定年度（指定するとNULLは引っ掛からなくなります）
        operationYear?: number, // 新設年度（指定するとNULLは引っ掛からなくなります）
        refreshYear?: number, // 最終更新年度（指定するとNULLは引っ掛からなくなります）
        rover?: number, // ルーバー？
        sound?: boolean, // 音響？
        comment?: string[], // 備考欄含有検索
        cars?: string[], // 車灯コード
        peds?: string[], // 歩灯コード

        // 取得後に絞り込むもの
        searched?: boolean, // 予備調査済みのものを絞る場合はtrue、そうでない場合はfalse
        hasThumbnail?: boolean, // 画像ありのもののみを絞る場合はtrue、そうでない場合はfalse
        hasDetail?: boolean, // 現地調査済みのもののみを絞る場合はtrue、そうでない場合はfalse
        
        // 出力操作
        withDetails?: boolean, // 現地調査情報を含める
        withThumbnails?: boolean, // 画像情報を含める
    ): Promise<Intersection[]> {
        // クエリを構築
        let intersections = await this.dbClient.intersection.findMany({
            where: {
                name: {
                    contains: name
                },
                road: {
                    contains: road
                },
                status: {
                    in: status
                },
                sign: {
                    contains: sign
                },
                isOfficialName: isOfficialName,
                decideYear: decideYear,
                operationYear: operationYear,
                refreshYear: refreshYear,
                rover: rover,
                sound: sound,
                AND: [].concat(
                    comment?.map((e) => {return {comment: {contains: e}}}) ?? [],
                    cars?.map((e) => {return {cars: {some: {carCode: e}}}}) ?? [],
                    peds?.map((e) => {return {peds: {some: {pedCode: e}}}}) ?? [],
                ),
            },
            include: {
                cars: {
                    select: {
                        carCode: true
                    }    
                },
                peds: {
                    select: {
                        pedCode: true
                    }
                },
                details: withDetails ? {
                    orderBy: {
                        id: "desc"
                    }
                } : false,
                thumbnails: withDetails ? {
                    orderBy: {
                        id: "desc"
                    }    
                } : false,
            }
        });

        const intersections_result = intersections.map(intersection => {
            return {
                ...intersection,
                cars: intersection?.cars.map(x => x.carCode),
                peds: intersection?.peds.map(x => x.pedCode)
            }
        })

        return intersections_result;
    }

    // 都道府県の画像をランダムで取得しそのURLを返す（※パスしか返しません）
    // TODO: なんかもっとはやく取得できる方法がないか探す
    private getRandomImage(pref: number, area?: number): string | null {
        // OS Shell機能を利用して該当する画像を取得
        try {
            let imgs_str = execSync(`find ${this.DATA_DIR}${pref}/${area??""} -name '*.JPG' -maxdepth 2`, {maxBuffer: 1048576 * 1024, stdio: ["ignore", "pipe", "ignore"]}).toString();
            if (!imgs_str) {
                return null;
            }
            const imgs = imgs_str.split("\n").filter(e => e !== "");
            
            return imgs[Math.floor(Math.random() * imgs.length - 1)];
        }
        catch (e) {
            if (e instanceof Error) {
                // findが失敗するのは確実にシステムエラー
                 
            }
            return null;
        }

        
        
    }

    
    
}
