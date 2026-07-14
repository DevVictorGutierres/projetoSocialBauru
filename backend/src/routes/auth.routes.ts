import { validate } from '../middlewares/validate.middleware.js';
import { authSchema } from "../validations/auth.schema.js";
import { login } from "../controllers/auth.controller.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/login",
    validate(authSchema),
    login);

export default authRouter;