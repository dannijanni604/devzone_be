import UserTask from "../models/userTask.model.js";
import Task from "../models/task.model.js";
import User from "../models/user.model.js";

export const submitUserTask = async (userId, taskId, answer) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  let status = answer ? "completed" : "missed";

  // Store user's answer
  await UserTask.create({
    user_id: userId,
    task_id: task._id,
    question: task.question,
    answer,
    points_earned: answer ? task.points : 0,
    status,
  });

  // Update task status
  task.status = status;
  await task.save();

  // Update user's points
  if (answer) {
    await User.findByIdAndUpdate(userId, { $inc: { points: task.points } });
  }

  return { message: "Task submitted successfully!" };
};
