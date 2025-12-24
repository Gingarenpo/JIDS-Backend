import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';
import { env } from 'process';
import { JIDSNotFound } from 'src/common/exceptions';
import { createURLFromFilePath} from 'src/common/helper';

@Injectable()
export class QueuesService {

    private dbClient: PrismaClient;

    constructor() { this.dbClient = new PrismaClient(); }

    /**
     * ユーザーのキュー一覧を取得する
     * @param user 
     * @returns 
     */
    async findQueues(user: User): Promise<any> {
        return await this.dbClient.queue.findMany({
            where: {
                userId: user.id
            },
            orderBy: {
                createDate: "desc",
            }
        });
    }

    /**
     * 現時点で登録されている全キューを取得する
     * 
     * @returns
     */
    async findAllQueues(): Promise<any> {
        return this.dbClient.queue.findMany({
            include: {
                user: true
            },
            orderBy: [
                {createDate: "desc"},
                {userId: "asc"},
            ]
        });
    }

    /**
     * 指定したキューIDのキューの中身を取得する
     * ただし、最高管理者とキューの送信アカウントしかその中身を見ることはできない
     */
    async getQueue(queueId: string): Promise<any> {
        let res = await this.dbClient.queue.findUnique({
            // MEMO: キューのJSONシリアライズ死ぬ
            where: {
                id: queueId
            },
            include: {
                details: {
                    include: {
                        pictures: true,
                        intersection: {
                            select: {
                                prefId: true,
                                areaId: true,
                                id: true,
                                name: true,
                            }
                        }
                    }
                },
                thumbnails: {
                    include: {
                        intersection: {
                            select: {
                                prefId: true,
                                areaId: true,
                                id: true,
                                name: true,
                            }
                        }
                    }
                }
            }
        });


        if (res == null) throw JIDSNotFound("指定したキューは存在しません。");

        // サムネイルのURLを表示するために加工する
        const result = {
            ...res,
            thumbnails: res.thumbnails.map((thumbnail) => {
                return {
                    ...thumbnail,
                    url: `${env.TMP_PREFIX}${res.id}/${thumbnail.prefId}/${thumbnail.areaId}/${thumbnail.intersectionId}.JPG`,
                }
            }),
        }

        return result;
    }

}
