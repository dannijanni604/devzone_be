import express from "express";
import * as TaskController from "../controllers/task.controller.js";
import * as UserTaskController from "../controllers/userTask.controller.js";

import { authenticateToken } from "../middlewares/user.middleware.js";

const router = express.Router();
router.post("/task/create", authenticateToken, TaskController.createTasks);
router.get("/task/all", authenticateToken, TaskController.fetchTasks);
//
router.post("/task/submit", authenticateToken, UserTaskController.submitTask);
export default router;
