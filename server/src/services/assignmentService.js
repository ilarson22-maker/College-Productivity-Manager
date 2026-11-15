// Assignment Service
// Handles the business logic for assignment operations.

const assignmentModel = require("../models/assignmentModel");

// Get all assignments.
const getAssignments = async () => {
    return await assignmentModel.getAllAssignments();
};

// Create a new assignment.
const addAssignment = async (title, dueDate) => {
    if (!title || title.trim() === "") {
        throw new Error("Assignment title is required.");
    }

    return await assignmentModel.createAssignment(
        title.trim(),
        dueDate
    );
};

// Update assignment completion status.
const completeAssignment = async (id, completed) => {
    return await assignmentModel.updateAssignment(id, completed);
};

// Delete an assignment.
const removeAssignment = async (id) => {
    return await assignmentModel.deleteAssignment(id);
};

module.exports = {
    getAssignments,
    addAssignment,
    completeAssignment,
    removeAssignment
};