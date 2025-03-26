import Task from "../models/task.model.js";

export const getAllTasks = async () => {
  return await Task.find().sort({ week: 1, order: 1 });
};

export const getUserTasks = async (userId) => {
  const tasks = await Task.find().sort({ week: 1, order: 1 });

  let openTask = null;
  let currentTime = new Date();

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].status === "open") {
      openTask = tasks[i];
      break;
    }
  }

  if (!openTask) {
    openTask = tasks.find((task) => task.status === "locked");
    if (openTask) {
      openTask.status = "open";
      openTask.start_time = currentTime;
      openTask.end_time = new Date(
        currentTime.getTime() + openTask.duration * 24 * 60 * 60 * 1000
      );
      await openTask.save();
    }
  }

  return { tasks, openTask };
};

export const createTasksService = async (tasks) => {
  await Task.deleteMany(); 
  return await Task.insertMany(tasks);
};
