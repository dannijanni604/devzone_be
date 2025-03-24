import mongoose from "mongoose";

const UsersSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    linkedin: { type: String, trim: true },
    github: { type: String, trim: true },
    team_members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }], // Array of user IDs
  },
  { timestamps: true }
);

export default mongoose.model("Users", UsersSchema);
