import * as PointsService from "../services/points.service.js";

export const getUserPoints = async (req, res) => {
  try {
    const userId = req.user._id;
    const result = await PointsService.getUserPointsService(userId);

    if (!result.success) {
      return res.status(400).json({ success: false, message: result.message });
    }

    res.status(200).json({
      success: true,
      task_points: result.task_points,
      project_points: result.project_points,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
