const express = require("express");
const router = express.Router();
const feedbackRoutes = require("./feedback");
const db = require("../config/db");

// Rute untuk feedback API
router.use("/feedbacks", feedbackRoutes);

// Rute untuk test koneksi database
router.get("/test-db", (req, res) => {
  db.query("SELECT 1 + 1 AS solution", (err, results) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      return res.status(500).json({ error: "Database connection failed" });
    }
    res.json({
      message: "Database connected successfully!",
      solution: results[0].solution,
    });
  });
});

feedback

module.exports = router;
