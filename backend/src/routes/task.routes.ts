import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
    createTaskController,
    getMyTaskController,
    getTaskById,
    updateTask,
    assignTask,
    changeTaskStatus,
    deleteTask,
} from "../controllers/task.controller.js";

const router = Router();

router.get("/my-tasks", authenticate, getMyTaskController);
router.post("/:projectId", authenticate, createTaskController);
router.get("/:taskId", authenticate, getTaskById);
router.put("/:taskId", authenticate, updateTask);
router.patch("/:taskId/assign", authenticate, assignTask);
router.patch("/:taskId/status", authenticate, changeTaskStatus);
router.delete("/:taskId", authenticate, deleteTask);

export default router;
