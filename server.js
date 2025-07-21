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

// Serve frontend (React build)
app.use(express.static(path.join(__dirname, "public")));

// API route for signup
app.post("/signup", (req, res) => {
  const { username, email, phone } = req.body;

  const sql = "INSERT INTO users (username, email, phone) VALUES (?, ?, ?)";
  db.query(sql, [username, email, phone], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).send("Database error");
    }
    res.send("User registered successfully!");
  });
});

// Catch-all route for React Router
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to Railway MySQL!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
