import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.js";

export const errorHandlerMiddleware = ( err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }

    if (err instanceof Error) {
        return res.status(500).json({
            status: "error",
            message: err.message,
        });
    }

    return res.status(500).json({
        status: "error",
        message: "Erro interno do servidor.",
    });
};