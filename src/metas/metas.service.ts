import { Injectable } from '@nestjs/common';
import { Controller } from '@nestjs/common/interfaces';
import { ModulesContainer, NestFactory, Reflector } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { AppModule } from 'src/app.module';
import { app } from 'src/main';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';

@Injectable()
export class MetasService {

    private client = new PrismaClient();

    constructor(private modulesContainer: ModulesContainer, private ref: Reflector) {}

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

    /**
     * 全エンドポイント一覧を返す
     */
    async getAllEndpoints() {
        // Nest Applicationからモジュール一覧を取得
        const endpoints = [];
        const modules = [...this.modulesContainer.values()];
        for (const module of modules) {
            // コントローラー一覧を取得
            const controllers = module.controllers.values();
            for (const controller of controllers) {
                const instance = app.get(controller.metatype);
                const prefix = this.ref.get<string>("path", instance.constructor);

                // さらに、その中のメソッドをすべて取得
                const prot = Object.getPrototypeOf(instance);
                const methods = Object.getOwnPropertyNames(prot);
                for (const method of methods) {
                    const m = prot[method];
                    const path = this.ref.get("path", m);
                    const httpMethod = this.ref.get("method", m);
                    if (httpMethod === undefined) continue; // 存在しないってことはHTTPメソッドではない

                    // なんか最後のスラッシュが増えたりするが特に影響ないのでそのまま出す
                    endpoints.push({path: `${prefix}/${path}`.replace("//", "/"), method: ["GET", "POST", "",][httpMethod]});
                }
            }
        }

        return endpoints;
    }
}
