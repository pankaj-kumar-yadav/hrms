import { Header } from "@/auth/authUtils";
import z from "zod";

export const apiKeySchema = z.object({
    apiKey: z.object({
        [Header.API_KEY]: z.string().nonempty({
            message: "API key is required",
        }),
    }),
});