import * as UserTaskService from "../services/userTask.service.js";

export const submitTask = async (req, res) => {
  try {
    const { task_id, answer } = req.body;
    const userId = req.user.id;

    const result = await UserTaskService.submitUserTask(
      userId,
      task_id,
      answer
    );
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
