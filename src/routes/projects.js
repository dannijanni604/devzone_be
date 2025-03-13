const express = require("express");
const {
  getAllProjects,
  createProject,
  deleteProject,
  getProjectById,
} = require("../controller/projectController");

const router = express.Router();

router.get("/all-projects", getAllProjects);
router.post("/submit-project", createProject);
router.delete("/projects/:id", deleteProject);
router.get("/:id", getProjectById);

module.exports = router;
module.exports = router;
