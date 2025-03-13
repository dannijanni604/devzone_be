const Project = require("../models/project.js");

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Error fetching projects" });
  }
};

// Create a new project
const createProject = async (req, res) => {
  try {
    const { repositoryLink, youtubeLink, skills } = req.body;

    if (!repositoryLink || !youtubeLink || !skills) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newProject = new Project({
      repositoryLink,
      youtubeLink,
      skills,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: "Error creating project" });
  }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Error fetching project" });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting project" });
  }
};

module.exports = {
  getAllProjects,
  createProject,
  getProjectById,
  deleteProject,
};
