import { Injectable } from '@nestjs/common';
import { Area, Intersection, IntersectionStatus, Pref, PrismaClient } from '@prisma/client';

// TODO: エリアなどで指定した中でもcarsとpedを名前の配列にする

// 多分本来は都道府県とエリアと交差点分けるべきだけどとりあえず今は結合しちゃっている
@Injectable()
export class DatasService {

    private dbClient: PrismaClient = new PrismaClient({});

    constructor() {}

    // 都道府県一覧を取得するメソッド
    // 第二引数と第三引数で各エリア・交差点情報を取得するが大変重い
    // とくに第三引数は返ってこないので指定すべきではない
    async findAllPref(withArea: boolean = false, withIntersection: boolean = false): Promise<Pref[]> {
        let prefs;
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
                            })
                        }
                    })
                }
            })
        }
        else {
            prefs = await this.dbClient.pref.findMany({
                include: {
                    area: withArea ? true : false,
                },
                orderBy: {
                    id: "asc"
                }
            });
        }

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

    
}
