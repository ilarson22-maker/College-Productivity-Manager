
// Assignment Controller
// Handles HTTP requests and responses for assignments.

const assignmentService = require("../services/assignmentService");

// Get all assignments.
const getAssignments = async (req, res) => {
    try {
        const assignments = await assignmentService.getAssignments();
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new assignment.
const addAssignment = async (req, res) => {
    try {
        const { title, dueDate } = req.body;

        const assignment = await assignmentService.addAssignment(
            title,
            dueDate
        );

        res.status(201).json(assignment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update assignment completion status.
const completeAssignment = async (req, res) => {
    try {
        const { completed } = req.body;

        const assignment = await assignmentService.completeAssignment(
            req.params.id,
            completed
        );

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found." });
        }

        res.status(200).json(assignment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an assignment.
const removeAssignment = async (req, res) => {
    try {
        const assignment = await assignmentService.removeAssignment(
            req.params.id
        );

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found." });
        }

        res.status(200).json({ message: "Assignment deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAssignments,
    addAssignment,
    completeAssignment,
    removeAssignment
};