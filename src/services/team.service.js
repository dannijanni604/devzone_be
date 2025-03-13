import Users from "../models/user.model.js";
import Team from "../models/team.model.js";
import { CheckValidation } from "../utils/validation.util.js";
import * as UserService from "../services/user.service.js";

// export const CreateTeamService = async (body, user) => {

//   const { team_name, department, team_lead, team_members } = body;

//   // Validate input
//   const validationError = CheckValidation(["team_name", "department"], {
//     body,
//   });
//   if (validationError) throw new Error(validationError);

//   const teamDepartment = await Department.findById(department);
//   if (!teamDepartment) throw new Error("Department does not exist!");

//   //  Check if the team already exists in any department
//   const existingTeam = await Team.findOne({ team_name });
//   if (existingTeam) {
//     const existingDepartment = await Department.findById(
//       existingTeam.department
//     );
//     throw new Error(
//       `Team ${team_name} already exists in department ${existingDepartment.department_name}`
//     );
//   }

//   // Create new team
//   const newTeam = new Team({ team_name, department, team_lead, team_members });
//   await newTeam.save();

//   return newTeam;
// };

export const GetAllTeamsService = async (user) => {
  const teams = await Team.find();
  if (teams.length === 0) throw new Error("No teams found");
  return teams;
};

export const GetTeamByIdService = async (teamId, user) => {
  const team = await Team.findById(teamId).populate(["team_members"]);
  if (!team) throw new Error("Team not found");
  return team;
};

export const UpdateTeamService = async (teamId, updateData, user) => {
  const team_members = updateData.team_members;

  if (team_members.length > 0) {
    const users = await Promise.all(
      team_members.map(async (memberId) => {
        const user = await UserService.UpdateUserService(memberId, {
          team: teamId,
        });
        return user;
      })
    );
  }

  const updatedTeam = await Team.findByIdAndUpdate(teamId, updateData, {
    new: true,
  }).select("-password");

  if (!updatedTeam) throw new Error("Team not found");

  return updatedTeam;
};

export const DeleteTeamService = async (team_name, user) => {
  const team = await Team.findOneAndDelete({ team_name });
  if (!team) throw new Error("Team not found");
  return team;
};

export const AddMemberToTeamService = async (team_name, member_name, user) => {
  const team = await Team.findOne({ team_name });
  if (!team) throw new Error("Team not found");
  if (team.team_members.includes(member_name))
    throw new Error("Person is already a member");

  team.team_members.push(member_name);
  await team.save();
  return team;
};

export const RemoveMemberFromTeamService = async (
  team_name,
  member_name,
  user
) => {
  const team = await Team.findOne({ team_name });
  if (!team) throw new Error("Team not found");
  if (!team.team_members.includes(member_name))
    throw new Error("Member not found in this team");

  team.team_members.pull(member_name);
  await team.save();
  return team;
};
