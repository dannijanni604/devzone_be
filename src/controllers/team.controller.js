import * as TeamService from "../services/team.service.js";
import { checkUserAuthorization } from "../utils/getUserRole.util.js";

export const CreateTeam = async (req, res) => {
  try {
    checkUserAuthorization(req.user);
    const newTeam = await TeamService.CreateTeamService(req.body, req.user);
    res
      .status(201)
      .json({ message: "Team created successfully", data: newTeam });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const GetAllTeams = async (req, res) => {
  try {
    checkUserAuthorization(req.user);
    const teams = await TeamService.GetAllTeamsService(req.user);
    res.status(200).json({ teams, message: "Teams fetched successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const GetTeamById = async (req, res) => {
  const { params, user } = req;
  const { teamId } = params;

  try {
    checkUserAuthorization(req.user);
    const team = await TeamService.GetTeamByIdService(teamId, user);
    res.status(200).json({ team, message: "Team fetched successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const UpdateTeam = async (req, res) => {
  try {
    checkUserAuthorization(req.user);
    const team = await TeamService.UpdateTeamService(
      req?.params?.teamId,
      req.body,
      req.user
    );
    res.status(200).json({ message: "Team updated successfully", team });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const DeleteTeam = async (req, res) => {
  try {
    checkUserAuthorization(req.user);
    await TeamService.DeleteTeamService(req?.params?.teamId, req.user);
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const AddMemberToTeam = async (req, res) => {
  try {
    checkUserAuthorization(req.user);
    const updatedTeam = await TeamService.AddMemberToTeamService(
      req?.params?.teamId,
      req.body.member_name,
      req.user
    );
    res
      .status(200)
      .json({ message: "Member added to team", data: updatedTeam });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const RemoveMemberFromTeam = async (req, res) => {
  try {
    checkUserAuthorization(req.user);
    const updatedTeam = await TeamService.RemoveMemberFromTeamService(
      req?.params?.teamId,
      req.params.member_name,
      req.user
    );
    res
      .status(200)
      .json({ message: "Member removed from team", data: updatedTeam });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
