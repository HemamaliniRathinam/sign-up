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
app.use(express.static(path.join(__dirname, "public")));

// Connect to MySQL
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

// API route to save user
app.post("/signup", (req, res) => {
  const { username, email, phone } = req.body;
  const sql = "INSERT INTO users (username, email, phone) VALUES (?, ?, ?)";
  db.query(sql, [username, email, phone], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).send("Database error");
    }
    res.status(200).send("Thank you! You are registered successfully.");
  });
});

// Fallback for React or static frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


