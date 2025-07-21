const path = require("path");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Serve static files (HTML/CSS/JS) from "public"
app.use(express.static(path.join(__dirname, "public")));

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to Railway MySQL!");
  }
});

// API: Handle signup form
app.post("/signup", (req, res) => {
  const { username, email, phone } = req.body;

  if (!username || !email || !phone) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = "INSERT INTO users (username, email, phone) VALUES (?, ?, ?)";
  db.query(sql, [username, email, phone], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ message: "Database error: " + (err.code || "Unknown error") });
    }
    res.json({ message: "User registered successfully!" });
  });
});

// Catch-all route (React Router or direct HTML navigation)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

