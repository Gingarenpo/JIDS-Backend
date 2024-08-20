// レート制限をいちいち管理するのがめんどくさいのでここで宣言する

export const Throttles = {
    // ユーザーデータ取得系
    user_get: {
        limit: 50,
        ttl: 60 * 60 * 24
    },
    // ユーザーデータ登録系
    user_post: {
        limit: 10,
        ttl: 60 * 60 * 24
    },
    // 情報取得系
    info_get: {
        limit: 100,
        ttl: 60 * 60 * 24
    },
    // 情報登録系
    info_post: {
        limit: 10,
        ttl: 60 * 60 * 24
    }
};