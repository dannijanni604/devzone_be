const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user.js");
const projectRoutes = require("./routes/projects.js"); //  import
const submitProjectRoutes = require("./routes/submitProject.js"); // Added import for submitProject
const tutorialRoutes = require("./routes/tutorials.js");

const teamRoutes = require("./routes/team.js");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const morgan = require("morgan"); // Adding this line for logging
app.use(morgan("dev")); // Adding this line to log requests

// API Routes
app.use("/api/v1/projects", projectRoutes);

app.use("/api/v1/submit-project", submitProjectRoutes); // submission route

app.use("/api/v1/tutorials", tutorialRoutes);
app.use("/api/v1/teams", teamRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Dev Zone Backend is running!");
});

console.log("MongoDB URI:", process.env.MONGO_URI); // Log the MongoDB URI
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
