const express = require("express");
const cors = require("cors");
const path = require("path");

// Load environment variables from the server folder.
require("dotenv").config({
    path: path.resolve(__dirname, "../.env")
});

// Import assignment routes and model.
const assignmentRoutes = require("./routes/assignmentRoutes");
const assignmentModel = require("./models/assignmentModel");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Main API route
app.get("/", (req, res) => {
    res.send("College Productivity Manager API is running!");
});

// Assignment routes
app.use("/api/assignments", assignmentRoutes);

// Start server after setting up the database table.
const startServer = async () => {
    try {
        await assignmentModel.createAssignmentTable();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Unable to start server:", error.message);
    }
};

startServer();