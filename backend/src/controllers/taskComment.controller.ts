import { Request, Response } from "express";
import prisma from "../lib/prisma.js";

export const createTaskCommentController = async (req: Request, res: Response) => {

    const user = req?.user
    const taskId = req.params.taskId as string

    if (!user?.organizationId) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }

    const { content } = req.body

    if (!content) {
        return res.status(400).json({ success: false, message: "Comment content is required" });
    }

    try {
        // Verify the task belongs to the user's organization
        const task = await prisma.task.findFirst({
            where: {
                id: taskId,
                project: {
                    organizationId: user.organizationId,
                }
            }
        })

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        // Employees can only comment on tasks assigned to them
        if (user.role === "EMPLOYEE" && task.assigneeId !== user.id) {
            return res.status(403).json({ success: false, message: "You can only comment on tasks assigned to you" });
        }

        const comment = await prisma.taskComment.create({
            data: {
                content,
                taskId,
                authorId: user.id,
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                taskId: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                    }
                },
                task: {
                    select: {
                        id: true,
                        title: true,
                    }
                }
            }
        })

        if (!comment) {
            return res.status(500).json({ success: false, message: "Failed to add comment" });
        }

        return res.status(201).json({ success: true, message: "Comment added successfully", comment });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" });
    }

}

export const getCommentsController = async (req: Request, res: Response) => {

    const user = req?.user
    const taskId = req.params.taskId as string

    if (!user?.organizationId) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }

    try {
        // Verify the task belongs to the user's organization
        const task = await prisma.task.findFirst({
            where: {
                id: taskId,
                project: {
                    organizationId: user.organizationId,
                }
            }
        })

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        // Employees can only view comments on tasks assigned to them
        if (user.role === "EMPLOYEE" && task.assigneeId !== user.id) {
            return res.status(403).json({ success: false, message: "You can only view comments on tasks assigned to you" });
        }

        const comments = await prisma.taskComment.findMany({
            where: {
                taskId,
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                taskId: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return res.status(200).json({ success: true, message: "Comments fetched successfully", comments });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" });
    }

}
