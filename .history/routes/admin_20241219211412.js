const express = require("express");
const AdminController = require("../controllers/AdminController");
const router = express.Router();

// Rute GET untuk menampilkan halaman
router.get("/donations", AdminController.donations);
router.get("/feedback", AdminController.feedback);
router.get("/users", AdminController.users);
router.get("/profile", AdminController.profile);
router.get("/add-user", AdminController.addUser); // Menampilkan form tambah user
router.get("/add-donation", AdminController.addDonation);

// Rute POST untuk menambahkan user
router.post("/add-user", AdminController.addUser); // Menangani form tambah user

module.exports = router;
