const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

// Rute untuk halaman donasi
router.get("/donations", AdminController.showDonations);

// Rute untuk halaman feedback
router.get("/feedback", AdminController.showFeedback);

// Rute untuk halaman daftar pengguna
router.get("/users", AdminController.showUsers);

// Rute untuk halaman profil pengguna
router.get("/profile", AdminController.showProfile);

module.exports = router;
