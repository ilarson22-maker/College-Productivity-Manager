// Assignment Routes
// Defines API endpoints for assignment operations.

const express = require("express");
const router = express.Router();

const assignmentController = require("../controllers/assignmentController");

// Get all assignments.
router.get("/", assignmentController.getAssignments);

// Create a new assignment.
router.post("/", assignmentController.addAssignment);

// Update assignment completion status.
router.patch("/:id", assignmentController.completeAssignment);

// Delete an assignment.
router.delete("/:id", assignmentController.removeAssignment);

module.exports = router;