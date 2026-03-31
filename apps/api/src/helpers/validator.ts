import { BadRequestError } from "@/core/CustomError";
import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export enum ValidationSource {
    BODY = "body",
    QUERY = "query",
    PARAMS = "params",
    HEADERS = "headers",
};

export const validateRequest = (schema: ZodSchema, source: ValidationSource = ValidationSource.BODY) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = schema.parse(req[source]);
            Object.assign(req[source], data);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                const message = err.issues.map((issue) => issue.message).join(", ");
                return next(new BadRequestError(message));
            }
            return next(err);
        }
    }
}