const express = require("express");
const {
  createTeam,
  addMember,
  removeMember,
} = require("../controller/teamController.js");

const router = express.Router();

router.post("/create-team", createTeam);
router.post("/add-member", addMember);
router.post("/remove-member", removeMember);

module.exports = router;
