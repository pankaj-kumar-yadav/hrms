import { ForbiddenError } from "@/core/CustomError";
import { Permission } from "@/models/apiKeyModel";
import { PublicRequest } from "@/types/app-request";
import { NextFunction, RequestHandler, Response } from "express";

export const XApiPermissionMiddleware = (permission: Permission): RequestHandler => {
    return (req: PublicRequest, res: Response, next: NextFunction) => {
        try {
            if (!req.apiKey?.permissions) {
                return next(new ForbiddenError("Permission denied"));
            };

            const existsPermission = req.apiKey.permissions.includes(permission);
            if (!existsPermission) {
                return next(new ForbiddenError("Permission denied"));
            };
            next();
        } catch (error) {
            next(error);
        };
    };
};
