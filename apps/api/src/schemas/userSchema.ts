import z from "zod";

export const userLoginSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
});

export const userRegisterSchema = z.object({
    name: z.string().trim().min(1, {
        message: "Name is required",
    }),
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long",
    }),
});