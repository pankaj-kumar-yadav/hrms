import { USER_DOCUMENT_NAME, UserDoc } from "@/models/userModels";
import { model, Model, Schema } from "mongoose";

export interface KeyStoreDoc extends Document {
    _id: string;
    client: UserDoc;
    primaryKey: string;
    secondaryKey: string;
    status: boolean;
}

export const KEY_STORE_DOCUMENT_NAME = "KeyStore";
export const KEY_STORE_COLLECTION_NAME = "keyStores";

const keyStoreSchema = new Schema<KeyStoreDoc>(
    {
        client: {
            type: Schema.Types.ObjectId,
            ref: USER_DOCUMENT_NAME,
            required: true,
        },
        primaryKey: {
            type: String,
            required: true,
            trim: true,
        },
        secondaryKey: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
    }, {
    timestamps: true,
    versionKey: false,
});

keyStoreSchema.index({ client: 1 });
keyStoreSchema.index({ client: 1, primaryKey: 1, status: 1 });
keyStoreSchema.index({ client: 1, primaryKey: 1, secondaryKey: 1 });

const KeyStoreModel: Model<KeyStoreDoc> = model<KeyStoreDoc>(KEY_STORE_DOCUMENT_NAME, keyStoreSchema, KEY_STORE_COLLECTION_NAME);

export default KeyStoreModel;