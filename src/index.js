import { app } from "./app.js";
import { UserRouter } from "./routes/user.routes.js";
import { DBConnect } from "./utils/dbConnect.util.js";
import TaskRouter from "./routes/task.routes.js";
import PointsRouter from "./routes/points.routes.js";
import { ConfigRouter } from "./routes/config.routes.js";

import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

DBConnect();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use("/api", UserRouter);
app.use("/api", TaskRouter);
app.use("/api", PointsRouter);

app.use("/api", ConfigRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`APP IS RUNNING ON PORT: ${PORT}`);
});
