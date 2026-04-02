import { tokenInfo } from "@/config";
import { BadRequestError, InternalError } from "@/core/CustomError";
import JWT, { JWTPayload } from "@/core/JWT";
import { UserDoc } from "@/models/userModels";
import { Types } from "mongoose";

export enum Header {
    API_KEY = "x-api-key",
};

export const createTokens = async (user: UserDoc, accessTokenKey: string, refreshTokenKey: string) => {
    const accessTokenPayload = new JWTPayload(tokenInfo.issuer, tokenInfo.audience, user._id.toString(), accessTokenKey, tokenInfo.accessTokenValidity);
    const accessToken = await JWT.encode(accessTokenPayload, tokenInfo.secret);

    if (!accessToken) throw new InternalError("Failed to create access token");

    const refreshTokenPayload = new JWTPayload(tokenInfo.issuer, tokenInfo.audience, user._id.toString(), refreshTokenKey, tokenInfo.refreshTokenValidity);
    const refreshToken = await JWT.encode(refreshTokenPayload, tokenInfo.secret);

    if (!refreshToken) throw new InternalError("Failed to create refresh token");

    return { accessToken, refreshToken };
};

export const getAccessToken = async (authorization: string) => {
    if (!authorization) throw new BadRequestError("Invalid Authorization");
    if (!authorization.startsWith("Bearer")) throw new BadRequestError("Invalid Authorization");

    return authorization.split(" ")[1];
};

export const validateTokenData = (payload: JWTPayload): boolean => {
    if (!payload || payload.iss !== tokenInfo.issuer || payload.aud !== tokenInfo.audience || !payload.sub || !payload.prm || !Types.ObjectId.isValid(payload.sub)) throw new BadRequestError("Invalid access token");
    return true;
}