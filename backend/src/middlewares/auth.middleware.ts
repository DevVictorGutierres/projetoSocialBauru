import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            error: "Token não informado."
        });
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({
            error: "Token inválido."
        });
    }

    try {

        const payload = verifyToken(token);

        req.user = {
            id: payload.userId
        };

        return next();

    } catch {

        return res.status(401).json({
            error: "Token inválido ou expirado."
        });

    }

};