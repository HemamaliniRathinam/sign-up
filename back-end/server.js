const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'NewPassword123!', 
  database: 'qrapp'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected!');
});

app.post('/signup', (req, res) => {
  const { username, email, phone } = req.body;
  const sql = "INSERT INTO users (username, email, phone) VALUES (?, ?, ?)";
  db.query(sql, [username, email, phone], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("User registered successfully!");
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});