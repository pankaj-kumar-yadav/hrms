import { ApiKeyDoc } from "@/models/apiKeyModel";
import { Request } from "express";

export interface ProtectedRequest extends Request {
    user?: any;
};

export interface PublicRequest extends Request {
    apiKey?: ApiKeyDoc;
};