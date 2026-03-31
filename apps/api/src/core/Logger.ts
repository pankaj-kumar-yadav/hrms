import { environment, logDirectory } from "@/config/config";
import fs from "fs";
import path from "path";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

let dir = logDirectory ?? "logs";

if (!dir) {
    dir = path.resolve('logs');
};

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
};

const logLevel = environment === "development" ? "debug" : "warn";

const dailyRotateFile = new DailyRotateFile({
    datePattern: "DD-MM-YYYY",
    filename: `${dir}/%DATE%-application.log`,
    format: format.combine(
        format.errors({ stack: true }),
        format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        format.json(),
        format.prettyPrint(),
    ),
    handleExceptions: true,
    level: logLevel,
    maxSize: "20m",
    maxFiles: "14d",
    zippedArchive: true,
});

export const logger = createLogger({
    transports: [
        new transports.Console({
            level: logLevel,
            format: format.combine(
                format.errors({ stack: true }),
                format.colorize(),
                format.prettyPrint(),
            ),
        }),
        dailyRotateFile,
    ],
    exceptionHandlers: [dailyRotateFile],
    exitOnError: false,
});
