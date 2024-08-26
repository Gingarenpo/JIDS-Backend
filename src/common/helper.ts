/**
 * パスの解決をしたりあれこれ使うための関数を集めたもの
 */

/**
 * URLをファイルパスに変換する。
 * 変換先のファイルが存在するかのチェックは行わない。
 * 
 * @param url URL
 */
export function resolveFilePathFromURL(url: string): string | null {
	return process.env.DATA_DIR + "/" + url.split("/").slice(3).join("/");
}

/**
 * ファイルパスをURLに変換する。
 * @param filePath ファイルパス
 * @returns 文字列
 */
export function createURLFromFilePath(filePath: string): string {
	return "/Data/" + filePath.replace(process.env.DATA_DIR, "");
}