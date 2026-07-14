import { authenticateUser } from "../services/auth.service.js";
import type { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, senha } = req.body;

        const token = await authenticateUser(email, senha);

        return res.status(200).json(token);

    } catch (error : unknown) {
        return res.status(401).json({
            error: "Usuário ou senha inválidos"
        });
    }
};