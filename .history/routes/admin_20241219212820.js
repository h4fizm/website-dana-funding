// routes/admin.js
const express = require("express");
const AdminController = require("../controllers/AdminController");
const router = express.Router();

// Rute GET untuk menampilkan halaman
router.get("/donations", AdminController.donations);
router.get("/feedback", AdminController.feedback);
router.get("/profile", AdminController.profile);
router.get("/add-user", AdminController.addUser); // Menampilkan form tambah user
router.get("/add-donation", AdminController.addDonation);
router.get("/users", AdminController.users); // Menampilkan daftar user

// Rute POST untuk menambahkan user
router.post("/add-user", AdminController.addUser); // Menangani form tambah user

// Route untuk menghapus user
router.delete("/delete-user/:id", AdminController.deleteUser);

module.exports = router;
