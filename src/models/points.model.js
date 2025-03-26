import mongoose from "mongoose";

const PointsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
    unique: true,
  },
  task_points: {
    total: { type: Number, default: 0 },
    breakdown: [
      {
        date: { type: Date, required: true },
        points: { type: Number, required: true },
      },
    ],
  },
  project_points: {
    total: { type: Number, default: 0 },
    breakdown: [
      {
        date: { type: Date, required: true },
        points: { type: Number, required: true },
      },
    ],
  },
});

export default mongoose.model("Points", PointsSchema);
