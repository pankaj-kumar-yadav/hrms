import dotenv from "dotenv";

dotenv.config();

export const environment = process.env.NODE_ENV;
export const port = Number(process.env.PORT);

// DB
export const mongoURI = process.env.MONGO_URI as string;
export const db = {
    minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE ?? "5"),
    maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE ?? "10"),
}

// Logger configuration
export const logDirectory = process.env.LOG_DIR;


export const corsUrl = process.env.CORS_URL;