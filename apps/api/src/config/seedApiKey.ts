import { mongoURI } from "@/config/config";
import { connectDB } from "@/config/db";
import { LoggerService } from "@/core/Logger";
import { ApiKeyDoc, ApiKeyModel, Permission } from "@/models/apiKeyModel";
import { randomBytes } from "crypto";
import mongoose from "mongoose";
import { pathToFileURL } from "url";

const generateApiKey = (): string => {
    return `hrms_${randomBytes(32).toString("hex")}`;
};

export const seedSampleApiKey = async (
    key: string = generateApiKey()
): Promise<ApiKeyDoc> => {
    const existingApiKey = await ApiKeyModel.findOne({ key });

    if (existingApiKey) {
        LoggerService.info(`Sample API key already exists: ${key}`);
        return existingApiKey;
    }

    const seededApiKey = await ApiKeyModel.create({
        key,
        version: 1,
        permissions: [Permission.GENERAL],
        status: true,
    });

    LoggerService.info(`Sample API key seeded successfully: ${key}`);
    return seededApiKey;
};

export const runSeedSampleApiKey = async (): Promise<void> => {
    try {
        await connectDB(mongoURI);
        await seedSampleApiKey();
    } catch (error) {
        LoggerService.error("Failed to seed sample API key", error);
        throw error;
    } finally {
        await mongoose.connection.close();
    }
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    runSeedSampleApiKey()
        .then(() => {
            process.exit(0);
        })
        .catch(() => {
            process.exit(1);
        });
}
