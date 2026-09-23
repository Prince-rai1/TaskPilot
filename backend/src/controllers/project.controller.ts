import { Request, Response } from "express";
import prisma from "../lib/prisma.js";

export const createProjectController = async (req: Request, res: Response) => {

    const admin = req?.user

    if (admin?.role !== "ADMIN" || !admin.organizationId) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }

    const { projectName, description, deadline, memberIds } = req.body

    if (!projectName || !memberIds || !Array.isArray(memberIds) || memberIds.length === 0) {
        return res.status(400).json({ success: false, message: "Name and at least one member are required" });
    }

    const validMembers = await prisma.user.findMany({
        where: {
            id: { in: memberIds },
            organizationId: admin.organizationId,
            role: "EMPLOYEE",
            status: "ACTIVE",
        }
    });

    if (validMembers.length !== memberIds.length) {
        return res.status(400).json({ success: false, message: "One or more selected employees are invalid or not part of your organization" });
    }

    try {

        const project = await prisma.project.create({
            data: {
                name: projectName,
                description,
                creatorId: admin.id,
                organizationId: admin.organizationId,
                deadline: deadline ? new Date(deadline) : null,
                members: {
                    create: memberIds.map((userId: string) => ({ userId }))
                }
            },
            select: {
                id: true,
                name: true,
                description: true,
                status: true,
                deadline: true,
                createdAt: true,
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                members: {
                    select: {
                        addedAt: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                // passwordHash nahi likha, toh yeh kabhi nahi aayega
                            }
                        }
                    }
                }
            }
        })

        if (!project) {
            return res.status(500).json({ success: false, message: "Failed to create project" });
        }

        return res.status(201).json({ success: true, message: "Project created successfully", project });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" });
    }

}

export const getAllProjects = async (req: Request, res: Response) => {
    const user = req?.user;

    if (!user || !user.organizationId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const projects = await prisma.project.findMany({
            where: {
                organizationId: user.organizationId,
                // If EMPLOYEE, fetch only projects they are enrolled in
                ...(user.role === "EMPLOYEE" ? {
                    members: {
                        some: {
                            userId: user.id
                        }
                    }
                } : {})
            },
            select: {
                id: true,
                name: true,
                description: true,
                status: true,
                deadline: true,
                createdAt: true,
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                members: {
                    select: {
                        addedAt: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                role: true,
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return res.status(200).json({ success: true, message: "Projects fetched successfully", projects });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getProjectById = async (req: Request, res: Response) => {
    const user = req?.user;
    const projectId = req.params.projectId as string;

    if (!user || !user.organizationId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                organizationId: user.organizationId,
                // If the user is an EMPLOYEE, ensure they are an assigned member of this project
                ...(user.role === "EMPLOYEE" ? {
                    members: {
                        some: {
                            userId: user.id
                        }
                    }
                } : {})
            },
            select: {
                id: true,
                name: true,
                description: true,
                status: true,
                deadline: true,
                createdAt: true,
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                members: {
                    select: {
                        addedAt: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                role: true,
                            }
                        }
                    }
                }
            }
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: user.role === "EMPLOYEE"
                    ? "Project not found or you are not a member of this project"
                    : "Project not found"
            });
        }

        return res.status(200).json({ success: true, message: "Project fetched successfully", project });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getProjectTasks = async (req: Request, res: Response) => {
    const user = req?.user;
    const projectId = req.params.projectId as string;

    if (!user || !user.organizationId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                organizationId: user.organizationId,
                // If EMPLOYEE, verify they belong to this project
                ...(user.role === "EMPLOYEE" ? {
                    members: {
                        some: {
                            userId: user.id
                        }
                    }
                } : {})
            }
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: user.role === "EMPLOYEE"
                    ? "Project not found or you are not a member of this project"
                    : "Project not found"
            });
        }

        // Privacy Filter: ADMIN gets all tasks; EMPLOYEE gets ONLY tasks assigned to them
        const tasks = await prisma.task.findMany({
            where: {
                projectId,
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
                createdAt: "desc"
            }
        });

        return res.status(200).json({ success: true, message: "Tasks fetched successfully", tasks });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const updateProjectStatus = async (req: Request, res: Response) => {
    const admin = req?.user
    const projectId = req.params.projectId as string

    if (admin?.role !== "ADMIN" || !admin.organizationId) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }

    const { status } = req.body

    const validStatuses = ["NOT_STARTED", "IN_PROGRESS", "COMPLETED", "ARCHIVED"]
    if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status." });
    }

    try {
        const project = await prisma.project.update({
            where: {
                id: projectId,
                organizationId: admin.organizationId,
            },
            data: {
                status,
            },
            select: {
                id: true,
                name: true,
                description: true,
                status: true,
                deadline: true,
                createdAt: true,
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                members: {
                    select: {
                        addedAt: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            }
                        }
                    }
                }
            }
        })

        return res.status(200).json({ success: true, message: "Project status updated successfully", project });
    } catch (error: any) {
        if (error?.code === "P2025") {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
