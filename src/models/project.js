const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  repositoryLink: { type: String, required: true },
  youtubeLink: { type: String, required: true },
  skills: { type: String, required: true },
});

module.exports = mongoose.model("Project", projectSchema);
