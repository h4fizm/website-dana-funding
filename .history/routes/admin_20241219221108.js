// routes/admin.js
const express = require("express");
const AdminController = require("../controllers/AdminController");
const router = express.Router();

// Rute GET untuk menampilkan halaman
router.get("/donations", AdminController.donations);
router.get("/feedback", AdminController.feedback);
router.get("/profile", AdminController.profile);
router.get("/add-donation", AdminController.addDonation);

router.get("/users", AdminController.users); // Menampilkan daftar user
router.get("/add-user", AdminController.addUser); // Menampilkan form tambah user
// Rute POST untuk menambahkan user
router.post("/add-user", AdminController.addUser); // Menangani form tambah user
// Route untuk menghapus user
router.delete("/delete-user/:id", AdminController.deleteUser);
router.get("/edit-user/:id", AdminController.editUser);
// Menambahkan route untuk menangani POST request pada update user
router.post("/edit-user/:id", AdminController.updateUser);

module.exports = router;
