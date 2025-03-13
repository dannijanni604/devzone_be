import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    team_name: { type: String, required: true, trim: true },
    team_lead: { type: String, trim: true },
    team_members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  },
  { timestamps: true }
);

export default mongoose.model("Teams", TeamSchema);
