import type {
    Request,
    Response,
    NextFunction
} from "express";

import type { ZodType } from "zod";

export const validateQuery = (schema: ZodType) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const result = schema.safeParse(req.query);

        if (!result.success) {
            return res.status(400).json({
                status: "error",
                errors: result.error.issues
            });
        }

        res.locals.query = result.data;

        return next();
    };
};