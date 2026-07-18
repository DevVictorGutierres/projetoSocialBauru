import "dotenv/config";
import express from "express";
import cors from "cors";

import userRouter from "./routes/user.routes.js";
import projectRouter from "./routes/project.routes.js";
import authRouter from "./routes/auth.routes.js";
import { errorHandlerMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
    return res.status(200).json({
        application: "Projeto Social API",
        version: "1.0.0",
        status: "online"
    });
});

app.use("/api", userRouter);
app.use("/api", projectRouter);
app.use("/api/auth", authRouter);
app.use(errorHandlerMiddleware);

export default app;