import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
    createTaskCommentController,
    getCommentsController,
} from "../controllers/taskComment.controller.js";

const router = Router();

router.post("/:taskId/comments", authenticate, createTaskCommentController);
router.get("/:taskId/comments", authenticate, getCommentsController);

export default router;
