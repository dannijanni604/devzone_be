const express = require("express");
const { getUser } = require("../controller/userController.js");
const { withAuth } = require("@clerk/clerk-sdk-node");

const router = express.Router();

router.get("/", withAuth(), getUser);

module.exports = router;
