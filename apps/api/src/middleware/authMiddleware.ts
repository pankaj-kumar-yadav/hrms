import User from "@/models/userModels";
import { ProtectedRequest } from "@/types/app-request";
import { NextFunction, RequestHandler, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const protect: RequestHandler = asyncHandler(async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
                userId: string;
            };

            req.user = await User.findById(decoded.userId).select("-password");

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed.");
        };
    } else {
        res.status(401);
        throw new Error("Not authorized, no token.");
    }
});

export { protect };
