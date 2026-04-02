import { decode as jwtDecode, sign, SignOptions, verify } from "jsonwebtoken";
import { BadTokenError, InternalError, TokenExpiredError } from "./CustomError";

export class JWTPayload {
    iss: string;
    aud: string;
    sub: string;
    prm: string;
    iat: number;
    exp: number;
    constructor(issuer: string, audience: string, subject: string, param: string, validity: number) {
        this.iss = issuer;
        this.aud = audience;
        this.sub = subject;
        this.prm = param;
        this.iat = Math.floor(Date.now() / 1000);
        this.exp = this.iat + validity;
    };
};

const encode = (payload: JWTPayload, secret: string): Promise<string> => {
    if (!secret) throw new InternalError("Token generation failure");
    try {
        const options: SignOptions = {
            algorithm: "HS256",
        }
        return new Promise((resolve, reject) => {
            sign({ ...payload }, secret, options, (err, token) => {
                if (err) return reject(new InternalError("Token generation failure"));
                resolve(token as string);
            });
        });
    } catch (error) {
        throw new InternalError("Token generation failure.");
    };
};

const decode = async (token: string): Promise<JWTPayload> => {
    if (!token) throw new InternalError("Token decoding failure");
    try {
        const decoded = jwtDecode(token);
        if (!decoded) throw new BadTokenError();

        return decoded as JWTPayload;
    } catch (error) {
        throw new BadTokenError();
    };
};

const validate = async (token: string, secret: string): Promise<JWTPayload> => {
    if (!token) throw new InternalError("Token decoding failure");
    try {
        return new Promise((resolve, reject) => {
            verify(token, secret, (err, decoded) => {
                if (err) {
                    if (err?.name === "TokenExpiredError") {
                        return reject(new TokenExpiredError())
                    };
                    return reject(new BadTokenError());
                };
                resolve(decoded as JWTPayload);
            });
        })
    } catch (error) {
        throw new InternalError("Token validation failure");
    };
};

export default {
    encode,
    decode,
    validate,
};