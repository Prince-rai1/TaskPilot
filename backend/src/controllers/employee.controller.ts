import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import { Prisma } from '@prisma/client';

export const addEmployeeController = async (req: Request, res: Response) => {
    try {

        const admin = req?.user

        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (admin?.role !== "ADMIN") {
            return res.status(403).json({ message: "Only admin can create employee" })
        }

        const existingAdmin = await prisma.user.findFirst({
            where: {
                id: admin?.id,
                role: "ADMIN",
                organizationId: admin?.organizationId,
                status: "ACTIVE"
            }
        });

        if (!existingAdmin) {
            return res.status(400).json({ message: "Admin not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const employee = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword,
                role: "EMPLOYEE",
                organizationId: existingAdmin.organizationId
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                organizationId: true,
                createdAt: true,
            }
        })

        return res.status(200).json({
            success: true,
            message: "Employee created successfully",
            employee
        });

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return res.status(409).json({
                success: false,
                message: "This email is already registered"
            });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAllEmployeesController = async (req: Request, res: Response) => {
    try {
        const organizationId = req.user?.organizationId;
        const admin = req?.user

        if (admin?.role !== "ADMIN") {
            return res.status(403).json({
                success: false,
                message: "Only admin can view employee",
            });
        }

        if (!organizationId) {
            return res.status(400).json({
                success: false,
                message: "Organization not found"
            });
        }

        const employees = await prisma.user.findMany({
            where: {
                organizationId,
                role: "EMPLOYEE"
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                organizationId: true,
                createdAt: true,
            }
        });

        return res.status(200).json({
            success: true,
            message: "Employees fetched successfully",
            employees
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const getSingleEmployeeController = async (req: Request, res: Response) => {
    try {
        const admin = req?.user;
        const organizationId = admin?.organizationId;
        const id = (req.params.id || req.params.employeeId) as string;

        if (admin?.role !== "ADMIN") {
            return res.status(403).json({
                success: false,
                message: "Only admin can view employee",
            });
        }

        if (!organizationId) {
            return res.status(400).json({
                success: false,
                message: "Organization not found"
            });
        }

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Employee ID is required"
            });
        }

        const employee = await prisma.user.findFirst({
            where: {
                id,
                organizationId,
                role: "EMPLOYEE"
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                organizationId: true,
                createdAt: true,
            }
        });

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Employee fetched successfully",
            employee
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const updateEmployeeStatusController = async (req: Request, res: Response) => {
    try {
        const admin = req?.user;
        const organizationId = admin?.organizationId;
        const employeeId = (req.params.id || req.params.employeeId) as string;
        const { status } = req.body;

        if (!employeeId) {
            return res.status(400).json({
                success: false,
                message: "Employee ID is required",
            });
        }

        if (admin?.role !== "ADMIN") {
            return res.status(403).json({
                success: false,
                message: "Only admin can update employee status",
            });
        }

        if (!organizationId) {
            return res.status(400).json({
                success: false,
                message: "Organization not found",
            });
        }

        const allowedStatuses = ["ACTIVE", "INACTIVE"];
        if (!status || !allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status. Allowed values: ACTIVE, INACTIVE",
            });
        }

        const existingEmployee = await prisma.user.findFirst({
            where: { id: employeeId, organizationId, role: "EMPLOYEE" },
        });

        if (!existingEmployee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found in your organization",
            });
        }

        const updatedEmployee = await prisma.user.update({
            where: { id: employeeId },
            data: { status },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                organizationId: true,
                updatedAt: true,
            },
        });

        return res.status(200).json({
            success: true,
            message: `Employee status updated to ${status} successfully`,
            employee: updatedEmployee,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
