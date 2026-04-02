import KeyStoreModel from "@/models/auth/keyStoreModel";
import { UserDoc } from "@/models/userModels";

const createKeyStore = async (client: UserDoc, primaryKey: string, secondaryKey: string) => {
    return await KeyStoreModel.create({
        client,
        primaryKey,
        secondaryKey,
    });
}