import * as TaskService from "../services/task.service.js";

export const createTasks = async (req, res) => {
  try {
    const tasks = req.body.tasks;

    if (!Array.isArray(tasks) || tasks.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or empty tasks array." });
    }

    const savedTasks = await TaskService.createTasksService(tasks);
    res
      .status(201)
      .json({
        success: true,
        message: "Tasks added successfully!",
        tasks: savedTasks,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const fetchTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tasks, openTask } = await TaskService.getUserTasks(userId);

    res.status(200).json({
      success: true,
      tasks,
      openTask,
      remainingTime: openTask
        ? Math.max(0, (openTask.end_time - new Date()) / (1000 * 60 * 60 * 24))
        : null,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
