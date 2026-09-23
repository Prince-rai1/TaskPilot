import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { AuthUserPayload } from "../types/express.js";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.Token;

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as AuthUserPayload;

        if (!decodedToken) {
            return res.status(401)
                .json({
                    success: false,
                    message: "Unauthorized"
                })
        }

        console.log(decodedToken);

        req.user = decodedToken;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
}
