
const log4js = require("log4js");
export const logger = log4js.configure({
    appenders: {
        out: { type: "stdout" },
        text: { type: "file", filename: "logs/text.log" },
    },
    categories: {
        default: { appenders: ["out", "text"], level: "all" },
    }
}).getLogger("JIDS");
