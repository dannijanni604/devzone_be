import * as UserTaskService from "../services/userTask.service.js";
import * as PointsService from "../services/points.service.js";

export const submitTaskAnswer = async (req, res) => {
  try {
    const userId = req.user._id;
    const { task_id, answer, points } = req.body;

    if (!task_id || !answer || points == null) {
      return res.status(400).json({
        success: false,
        message: "Task ID, answer, and points are required.",
      });
    }
    const result = await UserTaskService.submitTaskAnswerService(
      userId,
      task_id,
      answer
    );

    if (!result.success) {
      return res.status(400).json({ success: false, message: result.message });
    }
    const pointsResult = await PointsService.addTaskPoints(userId, points);
    if (!pointsResult.success) {
      return res
        .status(400)
        .json({ success: false, message: pointsResult.message });
    }

    res.status(200).json({
      success: true,
      message: "Task answer submitted successfully!",
      userTask: result.userTask,
      updatedPoints: pointsResult.updatedPoints,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
