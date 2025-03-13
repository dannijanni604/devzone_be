const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true }, // ✅ Clerk User ID
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
