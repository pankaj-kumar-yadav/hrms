import { apiKeySchema } from "@/auth/apikeySchema";
import { Header } from "@/auth/authUtils";
import { findByKey } from "@/controllers/apikeyController";
import { ForbiddenError } from "@/core/CustomError";
import { validateRequest, ValidationSource } from "@/helpers/validator";
import { PublicRequest } from "@/types/app-request";
import { NextFunction, Response, Router } from "express";

const router = Router();

router.use(validateRequest(apiKeySchema, ValidationSource.HEADERS));

export const ApiKeyMiddleware = async (req: PublicRequest, res: Response, next: NextFunction) => {
    const key = req.headers[Header.API_KEY] as string;
    if (!key) return next(new ForbiddenError());

    const apiKey = await findByKey(key);

    if (!apiKey) return next(new ForbiddenError());
    req.apiKey = apiKey;

    return next();
}