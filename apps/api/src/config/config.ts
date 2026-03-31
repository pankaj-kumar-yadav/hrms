import dotenv from "dotenv";

dotenv.config();

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;

// Logger configuration
export const logDirectory = process.env.LOG_DIR;

export const mongoURI = process.env.MONGO_URI;

export const corsUrl = process.env.CORS_URL;