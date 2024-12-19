const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

// Admin Dashboard Route
router.get("/dashboard", AdminController.showDashboard);

// Rute lainnya...
module.exports = router;
