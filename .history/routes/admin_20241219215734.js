// routes/admin.js
const express = require("express");
const AdminController = require("../controllers/AdminController");
const router = express.Router();

// Rute untuk menampilkan halaman
router.get("/donations", AdminController.donations);
router.get("/feedback", AdminController.feedback);
router.get("/profile", AdminController.profile);
router.get("/add-donation", AdminController.addDonation);

router.get("/users", AdminController.users); // Menampilkan daftar user
router.get("/add-user", AdminController.addUser); // Menampilkan form tambah user
router.post("/add-user", AdminController.addUserPost); // Menangani form tambah user
router.get("/edit-user/:id", AdminController.editUser); // Menampilkan form edit user
router.post("/edit-user/:id", AdminController.editUserPost); // Menangani pembaruan user

// Route untuk menghapus user
router.delete("/delete-user/:id", AdminController.deleteUser);

module.exports = router;
