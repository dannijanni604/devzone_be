import Task from "../models/task.model.js";
import UserTask from "../models/userTask.model.js";

export const submitTaskAnswerService = async (userId, taskId, answer) => {
  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return { success: false, message: "Task not found." };
    }

    if (task.status !== "open") {
      return { success: false, message: "Task is not open for answering." };
    }

    // Calculate remaining time
    const now = new Date();
    const taskDurationMs = task.duration * 24 * 60 * 60 * 1000;
    const startTime = task.start_time ? new Date(task.start_time) : now;
    const endTime = new Date(startTime.getTime() + taskDurationMs);
    const remainingTime = Math.max(0, (endTime - now) / (24 * 60 * 60 * 1000));

    // Mark task as completed
    task.status = "completed";
    await task.save();

    // Create user task record
    const userTask = await UserTask.create({
      user_id: userId,
      task_id: taskId,
      question: task.question,
      answer,
      points_earned: task.points,
      start_time: startTime,
      end_time: now,
    });

    // Find the next task in the same week
    const nextTask = await Task.findOne({
      week: task.week,
      order: task.order + 1,
      status: "locked",
    });

    if (nextTask) {
      // Schedule the next task to start at the current task's end time
      nextTask.status = "open";
      nextTask.start_time = endTime; // Use the end time of current task as start time
      nextTask.end_time = new Date(
        endTime.getTime() + nextTask.duration * 24 * 60 * 60 * 1000
      );
      await nextTask.save();
    }

    return {
      success: true,
      userTask,
      remainingTime: remainingTime,
      openTask: nextTask || null,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
