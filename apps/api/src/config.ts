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

export const tokenInfo = {
    issuer: process.env.TOKEN_ISSUER ?? "",
    audience: process.env.TOKEN_AUDIENCE ?? "",
    secret: process.env.TOKEN_SECRET ?? "",
    algorithm: process.env.TOKEN_ALGORITHM ?? "",
    accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC ?? "3600"),
    refreshTokenValidity: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC ?? "86400"),
};