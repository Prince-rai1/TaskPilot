import { CookieOptions, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const registerController = async (req: Request, res: Response) => {
    try {
        const { name, email, password, organizationName } = req.body;

        if (!name || !email || !password || !organizationName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword,
                role: "ADMIN",
                organization: {
                    create: { name: organizationName }
                }
            },
            include: {
                organization: true
            }
        });

        if (!user) {
            return res.status(400).json({ message: "Failed to create user" });
        }


        return res.status(200).json({
            success: true,
            message: "Organization created successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                organizationId: user.organizationId!
            },

            process.env.JWT_SECRET!,

            { expiresIn: "7d" }
        );

        const httpOptions: CookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }

        return res.status(200)
            .cookie("Token", token, httpOptions)
            .json({
                success: true,
                message: "Login successful",
                user
            });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const logoutController = async (req: Request, res: Response) => {
    try {
        const httpOptions: CookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        };

        return res
            .status(200)
            .clearCookie("Token", httpOptions)
            .json({
                success: true,
                message: "Logged out successfully"
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const getUserController = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User not authenticated"
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                organizationId: true,
                organization: {
                    select: {
                        id: true,
                        name: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                },
                createdAt: true,
                updatedAt: true,
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user,
            data: {
                user
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const getUser = getUserController;
export const logout = logoutController;

