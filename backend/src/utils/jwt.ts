import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

interface TokenPayload {
    userId: string;
    iat?: number;
    exp?: number;
}

export const generateToken = (userId: string): string => {
    return jwt.sign(
        { userId },
        JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );
};

export const verifyToken = (token: string): TokenPayload => {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
};