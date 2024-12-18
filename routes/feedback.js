const express = require("express");
const router = express.Router();
const { submitFeedback } = require("../controllers/FeedbackController");

// Route untuk menangani POST request feedback
router.post("/", submitFeedback);

module.exports = router;
