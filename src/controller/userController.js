const User = require("../models/User.js");

const getUser = async (req, res) => {
  try {
    const userId = req.auth.userId; // Assume userId is available from Clerk authentication

    console.log("User ID received:", userId);

    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Backend Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports.getUser = getUser;
