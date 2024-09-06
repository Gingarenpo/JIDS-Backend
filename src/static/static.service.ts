import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { exec } from 'child_process';
import { join } from 'path';

/**
 * 静的ファイルのサービス
 */
@Injectable()
export class StaticService {

    //@Cron("0 0 0 * * *")
    @Cron("0 0 0 * * *")
    async makeBCR() {
        exec(`${join(process.cwd(), "batch", ".venv", "bin", "python3")} ${join(process.cwd(), "batch", "bcr.py")}`, (err, stdout, stderr) => {
            if (err) {
                console.error("Failed: " + stderr);
            }
            else {
                console.log("Finished Task.");
            }
        });

        console.log("StaticService.makeBCR() called.");
    }
}
