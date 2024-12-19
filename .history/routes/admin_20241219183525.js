const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

// Rute untuk halaman dashboard
router.get("/dashboard", AdminController.showDashboard);

// Rute lainnya (donations, feedback, dll.)
router.get("/donations", AdminController.showDonations);

router.get("/feedback", AdminController.showFeedback);

router.get("/users", AdminController.showUsers);

router.get("/profile", AdminController.showProfile);

module.exports = router;
