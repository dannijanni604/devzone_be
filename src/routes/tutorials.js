const express = require("express");
const { getWeeklyTutorial } = require("../controller/tutorialController.js");

const router = express.Router();

router.get("/weekly-tutorial", getWeeklyTutorial);

module.exports = router;
