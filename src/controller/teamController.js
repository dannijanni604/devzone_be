const Team = require("../models/Team.js");
const User = require("../models/User.js"); //using User models

const createTeam = async (req, res) => {
  try {
    const { name, members } = req.body;

    if (!name || !members || members.length < 2 || members.length > 4) {
      return res.status(400).json({ error: "Invalid team data" });
    }

    const newTeam = new Team({
      name,
      members,
    });

    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ error: "Error creating team" });
  }
};

const addMember = async (req, res) => {
  try {
    const { teamId, userId } = req.body;

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    if (team.members.length >= 4) {
      return res.status(400).json({ error: "Team is full" });
    }

    team.members.push(userId);
    await team.save();

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: "Error adding member" });
  }
};

const removeMember = async (req, res) => {
  try {
    const { teamId, userId } = req.body;

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    team.members = team.members.filter(
      (member) => member.toString() !== userId
    );
    await team.save();

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: "Error removing member" });
  }
};

module.exports = { createTeam, addMember, removeMember };
