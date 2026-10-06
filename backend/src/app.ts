import express, { type Express } from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";
import taskCommentRoutes from "./routes/taskComment.routes.js";

const app: Express = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors({
    origin: process.env.CLIENT_URL, // or your FE origin
    credentials: true
}));

// Parse cookies from request headers
app.use(cookieParser());

// Parse incoming JSON requests
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/tasks", taskCommentRoutes);


export default app;

