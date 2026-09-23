import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
    createProjectController,
    getAllProjects,
    getProjectById,
    getProjectTasks,
    updateProjectStatus,
} from "../controllers/project.controller.js";

const router = Router();

router.post("/", authenticate, createProjectController);
router.get("/", authenticate, getAllProjects);
router.get("/:projectId", authenticate, getProjectById);
router.get("/:projectId/tasks", authenticate, getProjectTasks);
router.patch("/:projectId/status", authenticate, updateProjectStatus);

export default router;
