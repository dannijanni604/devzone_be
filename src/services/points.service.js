import Points from "../models/points.model.js";

export const getUserPointsService = async (userId) => {
  try {
    const points = await Points.findOne({ user_id: userId });

    if (!points) {
      return {
        success: true,
        message: "No points record found.",
        task_points: { total: 0, breakdown: [] },
        project_points: { total: 0, breakdown: [] },
      };
    }

    return {
      success: true,
      task_points: points.task_points,
      project_points: points.project_points,
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const addTaskPoints = async (userId, points) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    let userPoints = await Points.findOne({ user_id: userId });

    if (!userPoints) {
      userPoints = new Points({
        user_id: userId,
        task_points: {
          total: points,
          breakdown: [{ date: today, points }],
        },
      });
    } else {
      userPoints.task_points.total += points;

      const existingEntry = userPoints.task_points.breakdown.find(
        (entry) => entry.date === today
      );

      if (existingEntry) {
        existingEntry.points += points;
      } else {
        userPoints.task_points.breakdown.push({ date: today, points });
      }
    }

    await userPoints.save();

    // Remove _id from breakdown before returning response
    const sanitizedBreakdown = userPoints.task_points.breakdown.map(
      ({ date, points }) => ({ date, points })
    );

    return {
      success: true,
      task_points: {
        total: userPoints.task_points.total,
        breakdown: sanitizedBreakdown, // _id removed
      },
      project_points: {
        total: userPoints.project_points.total || 0,
        breakdown: userPoints.project_points.breakdown.map(
          ({ date, points }) => ({
            date,
            points,
          })
        ),
      },
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
