import express from "express";
import { getUserPoints } from "../controllers/points.controller.js";
import { authenticateToken } from "../middlewares/user.middleware.js";

const router = express.Router();

router.get("/get-points", authenticateToken, getUserPoints);

export default router;
