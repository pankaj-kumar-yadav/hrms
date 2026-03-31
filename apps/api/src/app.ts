import { corsUrl, environment } from "@/config/config";
import { ApiError, ErrorType } from "@/core/ApiError";
import healthRouter from "@/routes/health.route";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response, type Application } from "express";
import { LoggerService } from "./core/Logger";
import { InternalError } from "./core/CustomError";

const app: Application = express();

app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

app.use(cookieParser())

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api", healthRouter);

app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ApiError) {
        const statusCode = err.statusCode ?? 500;
        const logMessage = `${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`;

        if (err.type === ErrorType.INTERNAL) {
            LoggerService.error(logMessage);
        } else {
            LoggerService.error(logMessage);
        }

        if (err.stack) {
            LoggerService.error(err.stack);
        }

        if (environment === "development") {
            return res.status(statusCode).json({
                type: err.type,
                message: err.message,
                stack: err.stack,
            });
        }

        return ApiError.handle(err, res);
    }

    const fallbackError = new InternalError();
    const message = err instanceof Error ? err.message : "Unknown error";
    const stack = err instanceof Error ? err.stack : undefined;

    LoggerService.error(
        `${fallbackError.statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    );

    if (stack) {
        LoggerService.error(stack);
    }

    if (environment === "development") {
        return res.status(fallbackError.statusCode).json({
            type: fallbackError.type,
            message,
            stack,
        });
    }

    return ApiError.handle(fallbackError, res);
});

export { app };

