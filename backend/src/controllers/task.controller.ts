import { Request, Response } from "express";
import prisma from "../lib/prisma.js";

export const createTaskController = async (req: Request, res: Response) => {

    const admin = req?.user

    if (admin?.role !== "ADMIN" || !admin.organizationId) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }

    const projectId = req.params.projectId as string
    const { title, description, priority, dueDate, assigneeId } = req.body

    if (!title) {
        return res.status(400).json({ success: false, message: "Title is required" });
    }

    try {
        // Verify the project belongs to the admin's organization
        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
                organizationId: admin.organizationId,
            }
        })

        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        // If assigneeId is provided, verify the assignee is a valid active employee in the same org
        if (assigneeId) {
            const assignee = await prisma.user.findFirst({
                where: {
                    id: assigneeId,
                    organizationId: admin.organizationId,
                    role: "EMPLOYEE",
                    status: "ACTIVE",
                }
            })

            if (!assignee) {
                return res.status(400).json({ success: false, message: "Invalid assignee. Must be an active employee in your organization" });
            }
        }

        // Validate priority if provided
        const validPriorities = ["LOW", "MEDIUM", "HIGH", "HIGHEST"]
        if (priority && !validPriorities.includes(priority)) {
            return res.status(400).json({ success: false, message: "Invalid priority" });
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                priority,
                dueDate: dueDate ? new Date(dueDate) : null,
                projectId,
                creatorId: admin.id,
                assigneeId: assigneeId || null,
            },
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                priority: true,
                dueDate: true,
                createdAt: true,
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                assignee: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                project: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                }
            }
        })

        if (!task) {
            return res.status(500).json({ success: false, message: "Failed to create task" });
        }

        return res.status(201).json({ success: true, message: "Task created successfully", task });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" });
    }

}

export const getTaskById = async (req: Request, res: Response) => {
    const user = req?.user
    const taskId = req.params.taskId as string

    if (!user || !user.organizationId) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }

    try {
        const task = await prisma.task.findFirst({
            where: {
                id: taskId,
                project: {
                    organizationId: user.organizationId,
                },
                // If EMPLOYEE, verify task is assigned to them
                ...(user.role === "EMPLOYEE" ? { assigneeId: user.id } : {})
            },
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                priority: true,
                dueDate: true,
                createdAt: true,
                updatedAt: true,
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                assignee: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                project: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                comments: {
                    select: {
                        id: true,
                        content: true,
                        createdAt: true,
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
                },
                _count: {
                    select: {
                        comments: true
                    }
                }
            }
        })

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        return res.status(200).json({ success: true, message: "Task fetched successfully", task });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const updateTask = async (req: Request, res: Response) => {
    const admin = req?.user
    const taskId = req.params.taskId as string

    if (admin?.role !== "ADMIN" || !admin.organizationId) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }

    const { title, description, priority, dueDate } = req.body

    // Validate priority if provided
    const validPriorities = ["LOW", "MEDIUM", "HIGH", "HIGHEST"]

    if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({ success: false, message: "Invalid priority" });
    }

    try {
        // Verify task belongs to admin's organization
        const existingTask = await prisma.task.findFirst({
            where: {
                id: taskId,
                project: {
                    organizationId: admin.organizationId,
                }
            }
        })

        if (!existingTask) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        const task = await prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
                ...(title && { title }),
                ...(description !== undefined && { description }),
                ...(priority && { priority }),
                ...(dueDate !== undefined && { dueDate }),
            },
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                priority: true,
                dueDate: true,
                createdAt: true,
                updatedAt: true,
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                assignee: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                project: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        })

        return res.status(200).json({ success: true, message: "Task updated successfully", task });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const assignTask = async (req: Request, res: Response) => {
    const admin = req?.user
    const taskId = req.params.taskId as string

    if (admin?.role !== "ADMIN" || !admin.organizationId) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }

    const { assigneeId } = req.body

    if (!assigneeId) {
        return res.status(400).json({ success: false, message: "Assignee ID is required" });
    }

    try {
        // Verify task belongs to admin's organization
        const existingTask = await prisma.task.findFirst({
            where: {
                id: taskId,
                project: {
                    organizationId: admin.organizationId,
                }
            }
        })

        if (!existingTask) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        // Verify assignee is a valid active employee in the same org
        const assignee = await prisma.user.findFirst({
            where: {
                id: assigneeId,
                organizationId: admin.organizationId,
                role: "EMPLOYEE",
                status: "ACTIVE",
            }
        })

        if (!assignee) {
            return res.status(400).json({ success: false, message: "Invalid assignee. Must be an active employee in your organization" });
        }

        const task = await prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
                assigneeId,
            },
            select: {
                id: true,
                title: true,
                status: true,
                priority: true,
                assignee: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                project: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        })

        return res.status(200).json({ success: true, message: "Task assigned successfully", task });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const changeTaskStatus = async (req: Request, res: Response) => {
    const user = req?.user
    const taskId = req.params.taskId as string

    if (!user || !user.organizationId) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }

    const { status } = req.body

    const validStatuses = ["TODO", "IN_PROGRESS", "COMPLETED"]
    if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status" });
    }

    try {
        // Verify task belongs to user's organization
        const existingTask = await prisma.task.findFirst({
            where: {
                id: taskId,
                project: {
                    organizationId: user.organizationId,
                }
            }
        })

        if (!existingTask) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        // Employees can only change the status of tasks assigned to them
        if (user.role === "EMPLOYEE" && existingTask.assigneeId !== user.id) {
            return res.status(403).json({ success: false, message: "Forbidden: You can only update the status of your assigned tasks" });
        }

        const task = await prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
                status,
            },
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                priority: true,
                dueDate: true,
                createdAt: true,
                updatedAt: true,
                assigneeId: true,
                projectId: true,
                assignee: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                project: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                }
            }
        })

        return res.status(200).json({ success: true, message: "Task status updated successfully", task });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getMyTaskController = async (req: Request, res: Response) => {
    try {
        const user = req?.user;
        const employeeId = user?.id;

        if (!employeeId || !user?.organizationId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const tasks = await prisma.task.findMany({
            where: {
                assigneeId: employeeId,
                project: {
                    organizationId: user.organizationId,
                }
            },
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                priority: true,
                dueDate: true,
                createdAt: true,
                projectId: true,
                project: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        status: true,
                        deadline: true,
                    }
                },
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                assignee: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                }
            },
            orderBy: {
                dueDate: "asc"
            }
        });

        return res.status(200).json({ success: true, message: "Tasks fetched successfully", tasks });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getMyTasks = getMyTaskController;

export const deleteTask = async (req: Request, res: Response) => {
    const admin = req?.user
    const taskId = req.params.taskId as string

    if (admin?.role !== "ADMIN" || !admin.organizationId) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }

    try {
        // Verify task belongs to admin's organization
        const existingTask = await prisma.task.findFirst({
            where: {
                id: taskId,
                project: {
                    organizationId: admin.organizationId,
                }
            }
        })

        if (!existingTask) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        await prisma.task.delete({
            where: {
                id: taskId,
            }
        })

        return res.status(200).json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
