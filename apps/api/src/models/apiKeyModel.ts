import { model, Model, Schema } from "mongoose";

export enum Permission {
    GENERAL = "GENERAL",
};

export interface ApiKeyDoc extends Document {
    key: string;
    version: number;
    permissions: Permission[];
    status: boolean;
};

const DOCUMENT_NAME = "ApiKey";
const COLLECTION_NAME = "apiKeys";

const apiKeySchema = new Schema<ApiKeyDoc>(
    {
        key: {
            type: String,
            required: true,
            unique: true,
            maxlenght: 1024,
            trim: true,
        },
        version: {
            type: Number,
            required: true,
            min: 1,
            max: 100,
        },
        permissions: {
            type: [
                {
                    type: String,
                    enum: Object.values(Permission),
                    required: true,
                }
            ],
            required: true,
        },
        status: {
            type: Boolean,
            default: true,
            required: true,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

apiKeySchema.index({ key: 1, status: 1 });

export const ApiKeyModel: Model<ApiKeyDoc> = model<ApiKeyDoc>(DOCUMENT_NAME, apiKeySchema, COLLECTION_NAME);