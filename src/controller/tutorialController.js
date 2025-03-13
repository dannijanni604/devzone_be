const Tutorial = require("../models/tutorials.js"); // Updated import to match file name

const getWeeklyTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findOne().sort({ createdAt: -1 }).limit(1);
    res.status(200).json(tutorial);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tutorial" });
  }
};

module.exports = { getWeeklyTutorial };
