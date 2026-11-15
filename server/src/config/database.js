const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    database: String(process.env.DB_NAME),
    user: String(process.env.DB_USER),
    password: String(process.env.DB_PASSWORD),
});

// Test the database connection.
pool.on("connect", () => {
    console.log("Connected to PostgreSQL database!");
});

pool.on("error", (error) => {
    console.error("Database connection error:", error.message);
});

module.exports = pool;