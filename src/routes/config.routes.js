import express from "express";
import * as ConfigController from "../controllers/config.controller.js";
import { authenticateToken } from "../middlewares/user.middleware.js";

const ConfigRouter = express.Router();

ConfigRouter.get(
  "/get-config",
  authenticateToken,
  ConfigController.GetOfficeConfig
);

ConfigRouter.put(
  "/update-config",
  authenticateToken,
  ConfigController.UpdateOfficeConfig
);

export { ConfigRouter };
