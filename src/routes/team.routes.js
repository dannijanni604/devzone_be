import express from "express";
import * as TeamController from "../controllers/team.controller.js";
import { authenticateToken } from "../middlewares/user.middleware.js";

const TeamRouter = express.Router();

// TeamRouter.post("/team", authenticateToken, TeamController.CreateTeam);
TeamRouter.get("/teams", authenticateToken, TeamController.GetAllTeams);
TeamRouter.get("/teams/:teamId", authenticateToken, TeamController.GetTeamById);
TeamRouter.put("/teams/:teamId", authenticateToken, TeamController.UpdateTeam);
TeamRouter.delete(
  "/teams/:teamId",
  authenticateToken,
  TeamController.DeleteTeam
);
TeamRouter.post(
  "/teams/:teamId/members",
  authenticateToken,
  TeamController.AddMemberToTeam
);
TeamRouter.delete(
  "/teams/:teamId/members/:memberId",
  authenticateToken,
  TeamController.RemoveMemberFromTeam
);

export default TeamRouter;
