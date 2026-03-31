import { db, environment } from "@/config/config";
import { LoggerService } from "@/core/Logger";
import mongoose, { ConnectOptions, Query } from "mongoose";

const options: ConnectOptions = {
    autoIndex: environment === "development" ? true : false,
    minPoolSize: db.minPoolSize,
    maxPoolSize: db.maxPoolSize,
    connectTimeoutMS: 10000, // 10 seconds
    socketTimeoutMS: 45000, // 45 seconds
};

mongoose.set("strictQuery", true);

mongoose.plugin((schema) => {
    schema.pre("findOneAndUpdate", function (this: Query<unknown, unknown>) {
        this.setOptions({ runValidators: true });
    });
    schema.pre("updateOne", function (this: Query<unknown, unknown>) {
        this.setOptions({ runValidators: true });
    });
    schema.pre("updateMany", function (this: Query<unknown, unknown>) {
        this.setOptions({ runValidators: true });
    });
});

let listenersAttached = false;

const attachConnectionListeners = (url: string): void => {
    if (listenersAttached) {
        return;
    }

    mongoose.connection.on("connected", () => {
        LoggerService.debug(`Mongoose default connection open to ${url}`);
    });

    mongoose.connection.on("error", (error) => {
        LoggerService.error(`Mongoose default connection error: ${String(error)}`);
    });

    mongoose.connection.on("disconnected", () => {
        LoggerService.info("Mongoose default connection disconnected");
    });

    process.on("SIGINT", () => {
        mongoose.connection.close().finally(() => {
            LoggerService.info("Mongoose default connection disconnected through app termination");
            process.exit(0);
        });
    });

    listenersAttached = true;
};

export const connectDB = async (url: string): Promise<void> => {
    if (!url) {
        throw new Error("❌ MongoDB URI is not defined");
    }

    if (mongoose.connection.readyState === 1) {
        LoggerService.debug("MongoDB is already connected");
        return;
    }

    attachConnectionListeners(url);

    try {
        await mongoose.connect(url, options);
        LoggerService.info("✅ MongoDB connected");
    } catch (error) {
        LoggerService.error("❌ Failed to connect to MongoDB", error);
        throw error;
    }
};