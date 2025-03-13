import express from "express";
import * as UserController from "../controllers/user.controller.js";
import { authenticateToken } from "../middlewares/user.middleware.js";

const UserRouter = express.Router();

UserRouter.post("/user/create", UserController.Registration);
UserRouter.post("/user/login", UserController.Login);
// UserRouter.post("/user/forgot-password", UserController.ForgotPassword);
// UserRouter.put("/user/reset-password/:token", UserController.ResetPassword);
// UserRouter.put("/user/change-password", UserController.ChangePassword);
UserRouter.get("/users", authenticateToken, UserController.FetchAllUsers);
UserRouter.get("/profile", authenticateToken, UserController.FetchUser);
UserRouter.put("/update-profile", authenticateToken, UserController.UpdateUser);
UserRouter.delete("/delete-user", authenticateToken, UserController.DeleteUser);

export { UserRouter };
