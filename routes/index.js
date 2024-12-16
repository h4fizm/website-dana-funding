const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Test koneksi database
router.get("/test-db", (req, res) => {
  db.query("SELECT 1 + 1 AS solution", (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      res.json({ message: "Database connected!", result: results[0].solution });
    }
  });
});

// Tambahkan rute lain di sini
router.get("/donations", (req, res) => {
  db.query("SELECT * FROM donations", (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch donations" });
    } else {
      res.json({ donations: results });
    }
  });
});

module.exports = router;
