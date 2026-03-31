import { environment, logDirectory } from "@/config/config";
import { formatStackTrace } from "@/utils/formatStackTrace";
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
const stackTraceFormatter = format((info) => {
    const stackFromError = typeof info.stack === "string" ? info.stack : undefined;
    const stackFromMessage = typeof info.message === "string" && info.message.includes("\n    at ")
        ? info.message
        : undefined;
    const formattedStackTrace = formatStackTrace(stackFromError ?? stackFromMessage, {
        maxFrames: 25,
        appRoot: process.cwd(),
    });

    if (formattedStackTrace) {
        info.stackTrace = formattedStackTrace;
    }

    return info;
});

const dailyRotateFile = new DailyRotateFile({
    datePattern: "DD-MM-YYYY",
    filename: `${dir}/%DATE%-application.log`,
    format: format.combine(
        format.errors({ stack: true }),
        stackTraceFormatter(),
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

export const LoggerService = createLogger({
    transports: [
        new transports.Console({
            level: logLevel,
            format: format.combine(
                format.errors({ stack: true }),
                stackTraceFormatter(),
                format.colorize(),
                format.prettyPrint(),
            ),
        }),
        dailyRotateFile,
    ],
    exceptionHandlers: [dailyRotateFile],
    exitOnError: false,
});
