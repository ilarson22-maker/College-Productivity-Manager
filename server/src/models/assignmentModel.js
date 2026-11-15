// Assignment Model
// Handles all database operations related to assignments.

const pool = require("../config/database");

// Create the assignments table if it does not exist.
const createAssignmentTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS assignments (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            due_date DATE,
            completed BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    await pool.query(query);
};

// Get all assignments.
const getAllAssignments = async () => {
    const result = await pool.query(
        "SELECT * FROM assignments ORDER BY due_date ASC"
    );

    return result.rows;
};

// Add a new assignment.
const createAssignment = async (title, dueDate) => {
    const result = await pool.query(
        "INSERT INTO assignments (title, due_date) VALUES ($1, $2) RETURNING *",
        [title, dueDate || null]
    );

    return result.rows[0];
};

// Update assignment completion status.
const updateAssignment = async (id, completed) => {
    const result = await pool.query(
        "UPDATE assignments SET completed = $1 WHERE id = $2 RETURNING *",
        [completed, id]
    );

    return result.rows[0];
};

// Delete an assignment.
const deleteAssignment = async (id) => {
    const result = await pool.query(
        "DELETE FROM assignments WHERE id = $1 RETURNING *",
        [id]
    );

    return result.rows[0];
};

module.exports = {
    createAssignmentTable,
    getAllAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment
};