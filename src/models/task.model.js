import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    points: { type: Number, required: true },
    question: { type: String, required: true },
    answer: { type: String, default: "" },
    duration: { type: Number, required: true }, // Duration in days
    week: { type: Number, required: true }, // Week number (1-4)
    order: { type: Number, required: true }, // Task order in the week (1-4)
    status: {
      type: String,
      enum: ["locked", "open", "completed", "missed"],
      default: "locked",
    },
    start_time: { type: Date }, // When task is opened for a user
    end_time: { type: Date }, // When task should be completed
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
