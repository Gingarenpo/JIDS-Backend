import { Injectable } from '@nestjs/common';
import { DetailLight, PrismaClient } from '@prisma/client';
import { JIDSBadRequest } from 'src/common/exceptions';
import { logger } from 'src/logger';
import { randomBytes } from 'crypto';


@Injectable()
export class UploadService {

    private AdmZip = require("adm-zip");
    private fs = require("fs");
    private client: PrismaClient = new PrismaClient();
    private detailMatchPattern = /^([SHAMOC])([0-9]+)(-)?((?:[GYRFX]|[0-9]+))?([0-9]+)?\.JPG$/;

    constructor() {}

    /**
     * クライアント側から渡されたデータをもとに簡易チェックを行う
     * 
     * @param file アップロードされたファイル
     * @returns Zipファイルであればtrue、そうでなければfalse
     */
    private isZip(file: Express.Multer.File): boolean {

        // サイズチェック（0バイトなどはダメ）
        if (file.size === 0) {
            return false;
        }

        // mimetypeチェック（ただこれはクライアント側でいくらでも偽装できるので気休めにしかならない）
        if (file.mimetype !== "application/x-zip-compressed") {
            return false;
        }

        return true;
    }

    /**
     * Zipファイルを展開し、メモリインスタンスを返す
     * 開けない場合などは例外を落とす
     */
    private unzip(file: Express.Multer.File) {
        // Zipファイルを開いてみる（なんか暗号化されていても送れるらしい）
        let zip;
        try {
            zip = new this.AdmZip(file.buffer);
        }
        catch (e) {
            // ZIPファイルが何らかの形で開けなかった場合（ZIPじゃない、壊れている）
            throw JIDSBadRequest("アップロードされたファイルは有効なZIPファイルではありません。");
        }
        return zip;
    }

    /**
     * Zipファイルの中身を解釈し、サムネ・現地調査・無視ファイルを返す
     * 上記2つは、prefId.areaId.intersectionId.ファイルという形になる
     * @param zip ZIPファイル
     */
    private getEntries(zip) {
        const result = {
            thumbnail: {},
            detail: {},
            ignore: [],
        };
        const validPaths = [];

        for (const entry of zip.getEntries()) {
            const fileName = entry.entryName;
            
            // ディレクトリの場合は無視
            if (entry.isDirectory) {
                continue;
            }

            // サムネイルに相当するものを追加
            let m = fileName.match(/^(\d+)\/(\d+)\/(\d+)\.JPG$/);
            if (m) {
                // サムネイルとして追加
                if (!result.thumbnail[m[1]]) {
                    result.thumbnail[m[1]] = {};
                }
                if (!result.thumbnail[m[1]][m[2]]) {
                    result.thumbnail[m[1]][m[2]] = {};
                }
                result.thumbnail[m[1]][m[2]][m[3]] = {
                    path: entry,
                };
                validPaths.push(entry.entryName);
                continue;
            }

            // 現地調査に相当するものを追加
            m = fileName.match(/^(\d+)\/(\d+)\/(\d+)\/(\d{4}-\d{4})\/((?:.+)\.(?:JPG|PNG|txt))$/);
            if (m) {
                // 現地調査として追加
                // 現地調査はファイルがセットになるのでキーで分ける
                if (!(m[1] in result.detail)) {
                    result.detail[m[1]] = {};
                }
                if (!(result.detail[m[1]][m[2]])) {
                    result.detail[m[1]][m[2]] = {};
                }
                if (!(result.detail[m[1]][m[2]][m[3]])) {
                    result.detail[m[1]][m[2]][m[3]] = {};
                }
                if (!(result.detail[m[1]][m[2]][m[3]][m[4]])) {
                    result.detail[m[1]][m[2]][m[3]][m[4]] = [];
                }
                result.detail[m[1]][m[2]][m[3]][m[4]].push({
                    path: entry,
                    baseName: m[5],
                });
                if (m[5].endsWith("JPG") || m[5].endsWith("PNG")) {
                    validPaths.push(entry.entryName); // memo.txtは展開しない
                }
                continue;
            }

            // よくあるファイルはReasonつけとく
            result.ignore.push({
                path: fileName,
                reason: (fileName.endsWith("Thumbs.db")) ? "Windowsの隠しファイル形式です" : "不正なファイル名です",
            });
        }

        return { result, validPaths };
    }

    /**
     * 確保した現地調査データにおいて、キチンとフォーマットが一致しているかを確かめる
     * @param entries 分割したZipファイルのエントリー
     */
    private checkEntries(entries) {
        // 現地調査のセットがそろっているかどうか
        for (const prefId of Object.keys(entries.detail)) {
            for (const areaId of Object.keys(entries.detail[prefId])) {
                for (const intersectionId of Object.keys(entries.detail[prefId][areaId])) {
                    for (const date of Object.keys(entries.detail[prefId][areaId][intersectionId])) {
                        const memo = entries.detail[prefId][areaId][intersectionId][date].find(e => e.baseName.endsWith("memo.txt"));
                        if (memo === undefined) {
                            // 必須となるmemo.txtが存在しないので除外
                            entries.ignore = entries.ignore.concat(entries.detail[prefId][areaId][intersectionId][date].map(e => {return {path: e.path, reason: "現地調査データに必須であるmemo.txtが不足しているため、登録されません。"}}));
                            delete entries.detail[prefId][areaId][intersectionId][date];
                        }
                    }
                }
            }   
        }
        
        return entries;
    }

    /**
     * 
     * @param entries 登録するエントリー
     */
    private async registEntries(i, entries, comment, zip, validPaths) {
        let queue;
        const ExifReader = require('exifreader');
        await this.client.$transaction(async (client) => {
            logger.debug("キューの登録を開始");
            // キューIDをランダムで取得（random16byte）
            const queueId = randomBytes(16).toString("hex");
            
            // キューを登録
            queue = await client.queue.create({
                data: {
                    id: queueId,
                    user: {
                        connect: {
                            id: i.id,
                        }
                    },
                    exist: true,
                    comment: comment,
                }
            });

            // 各エントリをもとに、サムネと現地調査データを登録
            logger.debug("サムネイルデータの登録を開始");
            for (const prefId of Object.keys(entries.thumbnail)) {
                for (const areaId of Object.keys(entries.thumbnail[prefId])) {
                    for (const intersectionId of Object.keys(entries.thumbnail[prefId][areaId])) {
                        // EXIFを取得し撮影日の取得を試みる
                        const tags = await ExifReader.load(zip.readFile(entries.thumbnail[prefId][areaId][intersectionId].path));
                        const date = tags?.DateTimeOriginal?.description;
                        let takeDate;
                        if (date !== undefined) {
                            // UTCを無理やりJSTにしているのでこのへんどうにかしたい
                            takeDate = new Date(date.replaceAll(":", "-").slice(0, 10)+" 09:00:00+09:00");
                        }
                        
                        const thumbnail = await client.thumbnail.create({
                            data: {
                                queue: {
                                    connect: {
                                        id: queueId,
                                    }
                                },
                                intersection: {
                                    connect: {
                                        prefId_areaId_id: {
                                            prefId: parseInt(prefId),
                                            areaId: parseInt(areaId),
                                            id: intersectionId,
                                        }
                                    }
                                },
                                takeDate: takeDate,
                            }
                        });

                    }
                }
            }

            // detailに追加していく
            logger.debug("現地調査データの登録を開始");
            for (const prefId of Object.keys(entries.detail)) {
                for (const areaId of Object.keys(entries.detail[prefId])) {
                    for (const intersectionId of Object.keys(entries.detail[prefId][areaId])) {
                        // detailが空の場合は追加しない
                        if (Object.values(entries.detail[prefId][areaId][intersectionId]).length === 0) {
                            continue;
                        }

                        // 画像データを登録
                        let id:number = 1;
                        for (const date of Object.keys(entries.detail[prefId][areaId][intersectionId])) {
                            const takeDate = new Date(date.replace(/-(\d{2})(\d{2})$/, "-$1-$2") + " 09:00:00+09:00"); // JSTへ無理やり変換

                            // MEMOを取得
                            let memo = entries.detail[prefId][areaId][intersectionId][date].find(e => e.baseName.endsWith("memo.txt"));
                            if (memo === undefined) {
                                continue; // ありえないが無視
                            }
                            memo = await zip.readFile(memo.path).toString();
                            

                            // ヘッダー情報を登録
                            const detail = await client.detail.create({
                                data: {
                                    queue: {
                                        connect: {
                                            id: queueId,
                                        }
                                    },
                                    intersection: {
                                        connect: {
                                            prefId_areaId_id: {
                                                prefId: parseInt(prefId),
                                                areaId: parseInt(areaId),
                                                id: intersectionId,
                                            }
                                        }
                                    },
                                    takeDate: takeDate,
                                    comment: memo,
                                }
                            });


                            // ファイル名を分割して登録を行う
                            for (const p in entries.detail[prefId][areaId][intersectionId][date]) {
                                const pic = entries.detail[prefId][areaId][intersectionId][date][p];
                                const m = pic.baseName.match(this.detailMatchPattern);
                                if (m === null) {
                                    continue;
                                }
                                
                                // それぞれ登録
                                const type = m[1];
                                const number = parseInt(m[2]);
                                const light = DetailLight[m[4]];
                                const subNumber = parseInt(m[5]);
                                const plate = (type != "A" && m[3] === undefined);
                                const detailPicture = await client.detailPicture.create({
                                    data: {
                                        detail: {
                                            connect: {
                                                id: detail.id,
                                            }
                                        },
                                        id: id++,
                                        type: type,
                                        number: number,
                                        light: light,
                                        subNumber: subNumber,
                                        plate: plate,
                                        result: false,

                                    }
                                });

                                // エントリーの内容がそのままJSONに出てしまうのでentryNameに置き換え
                                entries.detail[prefId][areaId][intersectionId][date][p] = entries.detail[prefId][areaId][intersectionId][date][p]["path"]["entryName"];
                            }
                        }
                    }
                }
            }

            // Zipファイルを展開し、キューとして保存
            // サムネイルデータだけは重複を防ぐために過去のものは_IDとして保存する必要があり
            // それ以外は一応重複は存在しないので、一度tmpに展開する
            // 一気にまとめてextractすると弾いたファイルまで出てきてしまうので
            // エントリーとしてまとめた配列を使用する（もっと効率いいやり方あれば教えてください…）
            logger.debug("ファイルのコピーを開始…");
            await this.fs.promises.mkdir(process.env.TMP_DIR + queueId, {recursive: true});

            for (const entry of validPaths) {
                try {
                    zip.extractEntryTo(entry, process.env.TMP_DIR + queueId, true, true);
                }
                catch (e) {
                    logger.error(e);
                    this.fs.promises.rmdir(process.env.TMP_DIR + queueId, {recursive: true});
                    throw new Error("ファイルの展開に失敗"); // 出さないとロールバックされない
                    
                }
            }
            logger.debug("ファイルのコピー終了");
            

        });
        return queue;
    }

    ///////////////////////////////////////////////////////////////
    // ZIPファイルの処理エントリークラス
    ///////////////////////////////////////////////////////////////
    /**
     * 
     * @param file アップロードされたファイル
     */
    async processZip(i, file, comment) {
        if (!this.isZip(file)) {
            throw JIDSBadRequest("アップロードされたファイルは有効なZIPファイルではありません。");
        }
        // ZIPファイルを展開
        const zip = this.unzip(file);

        // 登録可能なエントリーを取得

        const {result, validPaths} = this.getEntries(zip);
        const entries = this.checkEntries(result);

        if (Object.keys(entries.thumbnail).length == 0 && Object.keys(entries.detail).length == 0) {
            return {
                queue: null,
                entries: entries,
                message: "有効なデータが一つもないためキューに登録していません",
            }
        }

        // キュー情報を登録し、現地調査データとサムネイルデータを登録する
        // ファイルコピー・DBすべてトランザクションで囲む（ファイルのトランザクション難しいんだけども）
        const queue = await this.registEntries(i, entries, comment, zip, validPaths);
        return {
            queue: queue,
            entries: entries,
        };
    }
}
