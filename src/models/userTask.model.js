import mongoose from "mongoose";

const UserTaskSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    task_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    points_earned: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("UserTask", UserTaskSchema);
