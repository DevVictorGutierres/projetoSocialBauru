import { authenticateUser } from "../services/auth.service.js";
import type { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
        const token = await authenticateUser(req.body);
        return res.json(token);
};