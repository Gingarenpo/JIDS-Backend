import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ValidateSearchRequestDto, SearchDiff } from './validates.module';
import { VALIDATORS } from './validates.validator';

@Injectable()
export class ValidatesService {
    // DBクライアント
    private dbClient: PrismaClient;

    constructor() {
        this.dbClient = new PrismaClient();
    }

    /**
     * 予備調査の差分情報とその更新前・更新後交差点情報を取得して編集内容が妥当かどうかを検証する
     * データベースへのアクセスは最小限に抑えたいところ
     * @param validateSearchRequestDto APIから受け取った差分diffsの一覧
     */
    async checkSearchData(validateSearchRequestDto: ValidateSearchRequestDto): Promise<object[]> {
        // チェック対象の交差点の現在登録されている情報をすべて取得する（新規以外）
        // WHERE ROW INを使用する
        const intersections = await this.dbClient.intersection.findMany({
            where: {
                OR: validateSearchRequestDto.diffs.filter((diff: SearchDiff) => diff.original.prefId != null).map((diff: SearchDiff) => {
                    return {
                        prefId: diff.original.prefId,
                        areaId: diff.original.areaId,
                        id: diff.original.id
                    }
                })
            }
        });

        // エラー一覧
        const result: object[] = [];

        // 各差分に対して検証を開始
        for (const diff of validateSearchRequestDto.diffs) {
            const subResult = {diff: diff.diff, errors: []};
            // 各キーにおけるそれぞれのバリデーションチェックを行う
            for (const key of Object.keys(diff.diff)) {
                
                // キーによってバリデーションチェックの内容が違うのでそれぞれの関数を呼び出す
                const validator = VALIDATORS[key];
                if (!validator) continue; // 存在しないものはスキップしてエラー扱いにしない

                // バリデーションを実行
                const errors = await validator(diff.diff[key].after, {diff, current: intersections.find(intersection => intersection.id == diff.original.id) ?? Object.fromEntries(Object.entries(diff.diff).map(([key, value]) => [key, value.after]))});
                if (errors.length > 0) {
                    // エラーがあった場合は差分情報を返却する
                    subResult.errors.push(...errors);
                }

            }
            if (subResult.errors.length > 0) {
                result.push(subResult);
            }
        }

        // 返却
        return result;
    }

    /**
     * 検証が終わったデータを渡す想定で、差分情報を基に実際にデータベースに差分を更新する
     * 失敗すると例外を投げるので注意
     * @param validateSearchRequestDto 
     */
    async upsertSearchData(validateSearchRequestDto: ValidateSearchRequestDto): Promise<any> {
        // 何度も言うが検証は終わっている前提。このサービスをAPIから直接叩いてはいけない
        // 差分をUpsertできる形に変換する
        function diffToUpsertData(diff: SearchDiff): Record<string, any> {
            return Object.fromEntries(Object.entries(diff.diff).map(([key, value]) => [key, value.after]));
        }
    }

}
