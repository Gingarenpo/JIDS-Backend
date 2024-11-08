import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';

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
    }
}
