/**
 * 予備調査のバリエータを格納するファイル
 */

import { Validator } from "./validates.module";
import { PrismaClient } from "@prisma/client";

const validatePrefId: Validator<number|null> = (value) => {
    const errors: string[] = [];

    // nullはエラー
    if (value === null) {
        errors.push("都道府県コードが入力されていません。");
    }

    // ハードコーディングだけど都道府県が今後増える想定もないので
    if (value != null && value < 1 || value > 47) {
        errors.push("存在しない都道府県コードが指定されています。");
    }

    return errors;
}

const validateAreaId: Validator<number|null> = async (value, ctx) => {
    const errors: string[] = [];
    const client = new PrismaClient();

    // nullはエラー
    if (value === null) {
        errors.push("エリアコードが入力されていません。");
    }

    // 悲しいけどprefと一緒にチェックするためarea一覧を取得する
    const areas = await client.area.findMany({select: {id: true, prefId: true}});
    const area = areas.find(area => area.id == value && area.prefId == ctx.diff.edited.prefId);
    if (value !== null && !area) {
        errors.push("存在しないエリアコードが指定されています。");
    }

    return errors;

}

const validateId: Validator<string|null> = (value) => {
    const errors: string[] = [];

    // nullはエラー
    if (value === null) {
        errors.push("管理番号が入力されていません。");
    }

    return errors;
}

const validateName: Validator<string|null> = (value, ctx) => {
    const errors: string[] = [];

    // ステータスが「現存」「廃止」でnullの場合はエラー
    if ((value === null || value == "") && (ctx.current.status != "MERGE" && ctx.current.status != "MOVE" && ctx.current.status != "UNKNOWN")) {
        errors.push("現存、あるいは廃止が分かっている交差点は交差点名称を入力する必要があります。");
    }

    return errors;
}

const validateStatus: Validator<string|null> = (value) => {
    const errors: string[] = [];

    // APIを直でたたかれた場合にここに想定しない値が入る可能性があるため
    if (!["MERGE", "MOVE", "UNKNOWN", "LIVE", "GONE"].includes(value)) {
        errors.push("交差点状態が不正です。");
    }

    return errors;

}

const validateYear: Validator<number|null> = (value) => {
    const errors: string[] = [];

    // 負の数値はエラー
    if (value != null && value < 0) {
        errors.push("紀元前の年を入力することはできません。");
    }

    // 未来に関しては可能性があるためここではチェックしない

    return errors;
}

const validateCars: Validator<string[]|null> = async (value, ctx) => {
    const errors: string[] = [];
    const client:PrismaClient = new PrismaClient();

    // 移管以外で空の場合は原則エラー（不明な場合は「？」を入れるべき）
    if ((value === null || value.length == 0) && ctx.current.status != "MOVE") {
        errors.push("車灯コードが未入力です。");
    }

    // 存在しないコードを入力した場合はエラー
    const cars = await client.car.findMany({select: {code: true}});
    for (const code of value) {
        if (!cars.find(car => car.code == code)) {
            errors.push(`${code}は車灯コードとして不適切です。`);
        }
    }

    return errors;
}

const validatePeds: Validator<string[]|null> = async (value, ctx) => {
    const errors: string[] = [];
    const client:PrismaClient = new PrismaClient();

    // 移管以外で空の場合は原則エラー（不明な場合は「？」を入れるべき）
    // としたいところだが当面の間、未対応の場所を含むので容認
    //if ((value === null || value.length == 0) && ctx.current.status != "MOVE") {
    //    errors.push("歩灯コードが未入力です。");
    //}

    // 存在しないコードを入力した場合はエラー
    const peds = await client.ped.findMany({select: {code: true}});
    for (const code of value) {
        if (!peds.find(ped => ped.code == code)) {
            errors.push(`${code}は歩灯コードとして不適切です。`);
        }
    }

    return errors;
}

const validateRover: Validator<number|null> = (value) => {
    const errors: string[] = [];

    // 取りえる値は0,1,2,3
    if (value != null && value < 0 || value > 3) {
        errors.push("フラグの値が不正です。");
    }

    return errors;
}

const validateLocation: Validator<{x: string|null, y: string|null, city?: string|null}|null> = (value) => {
    const errors: string[] = [];

    // nullはエラー
    if (value === null) {
        errors.push("緯度経度が入力されていません。");
    }

    if (value?.x == null || value?.x == "") {
        errors.push("経度が入力されていません。");
    }

    if (value?.y == null || value?.y == "") {
        errors.push("緯度が入力されていません。");
    }

    // cityに関しては自動で反映されるのでここではチェックしない
    // 緯度経度がそもそもNumberではない場合はエラー
    if (value?.x != null && isNaN(Number(value.x))) {
        errors.push("経度の値が不正です。");
    }
    if (value?.y != null && isNaN(Number(value.y))) {
        errors.push("緯度の値が不正です。");
    }

    // 経度（x）が0〜180の範囲外の場合はエラー
    if (value?.x != null && (Number(value.x) < 0 || Number(value.x) > 180)) {
        errors.push("地球上に存在しない経度が指定されています。");
    }
    // 緯度（y）が-90〜90の範囲外の場合はエラー
    if (value?.y != null && (Number(value.y) < -90 || Number(value.y) > 90)) {
        errors.push("地球上に存在しない緯度が指定されています。");
    }

    return errors;
}

/**
 * 各パラメーターに紐づくバリエータの管理
 */
export const VALIDATORS: Record<string, Validator<any>> = {
    prefId: validatePrefId,
    areaId: validateAreaId,
    id: validateId,
    name: validateName,
    status: validateStatus,
    decideYear: validateYear,
    operationYear: validateYear,
    refreshYear: validateYear,
    cars: validateCars,
    peds: validatePeds,
    rover: validateRover,
    location: validateLocation,
};