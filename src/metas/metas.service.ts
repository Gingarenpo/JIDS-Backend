import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MetasService {

    private client = new PrismaClient();

    constructor() {}

    /**
     * DBにアクセスするタイプのメタ情報を返す
     */
    async getInfo(): Promise<Object> {
        return await this.client.$queryRaw`
        SELECT
            (SELECT COUNT(*)::INTEGER FROM info.intersection) AS "intersectionCount",
            (SELECT COUNT(*)::INTEGER FROM (SELECT id FROM info.detail GROUP BY "prefId", "areaId", "id")) AS "detailCount",
            (SELECT COUNT(*)::INTEGER FROM (SELECT id FROM info.thumbnail GROUP BY "prefId", "areaId", "id")) AS "thumbnailCount",
            (SELECT COUNT(*)::INTEGER FROM core.user) AS "userCount"
        `;

    }
}
