const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

// Rute untuk setiap laman
router.get("/donations", AdminController.getDonationsPage);
router.get("/feedback", AdminController.getFeedbackPage);
router.get("/users", AdminController.getUsersPage);
router.get("/profile", AdminController.getProfilePage);

module.exports = router;
