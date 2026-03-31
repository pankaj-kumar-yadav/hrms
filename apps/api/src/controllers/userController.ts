import User from "@/models/userModels";
import { ProtectedRequest } from "@/types/app-request";
import { generateToken } from "@/utils/generateToken";
import { RequestHandler, Response } from "express";
import asyncHandler from "express-async-handler";

export const loginUser: RequestHandler = asyncHandler(async (req: ProtectedRequest, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user?.matchPassword?.(password))) {
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

export const registerUser: RequestHandler = asyncHandler(async (req: ProtectedRequest, res: Response) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    };

    const user = await User.create({ name, email, password });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

export const logoutUser: RequestHandler = asyncHandler(async (req: ProtectedRequest, res: Response) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({
        message: "Logged out successfully"
    });
});