const express = require("express");
const router = express.Router();

// Importing Project model here
const Project = require("../models/project"); // Ensures the casing matches the actual file name

// POST /api/submit-project
router.post("/", async (req, res) => {
  const { repositoryLink, youtubeLink, skills } = req.body;

  try {
    const newProject = new Project({
      repositoryLink,
      youtubeLink,
      skills,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error saving project:", error);
    res.status(500).json({ error: "Failed to save project" });
  }
});

module.exports = router;
