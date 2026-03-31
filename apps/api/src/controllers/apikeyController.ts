import { ApiKeyDoc, ApiKeyModel } from "@/models/apiKeyModel";

export const findByKey = async (key: string): Promise<ApiKeyDoc | null> => {
    return await ApiKeyModel.findOne({ key, status: true });
};