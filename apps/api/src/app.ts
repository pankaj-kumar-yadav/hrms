import express, { type Application } from "express";
import healthRouter from "@/routes/health.route";

const app: Application = express();

// middlewares
app.use(express.json());

// routes
app.use("/api", healthRouter);

export { app };