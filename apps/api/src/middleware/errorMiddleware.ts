import { NextFunction, Request, Response } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 404;
        message = "Resource not found";
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
};

const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export { errorHandler, notFound };
