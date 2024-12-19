// routes/admin.js
const express = require("express");
const AdminController = require("../controllers/AdminController");
const upload = require("../config/upload"); // Import the upload configuration
const router = express.Router();

// Rute GET untuk menampilkan halaman
router.get("/donations", AdminController.donations);
router.get("/add-donation", AdminController.addDonation);
router.get("/detail-crowdfund/:id", AdminController.detailCrowdfund);
router.get("/delete-crowdfund/:id", AdminController.deleteCrowdfund);
router.get("/edit-crowdfund/:id", AdminController.editCrowdfund);
// Use the upload middleware for the POST route
router.post("/add-donation", upload, AdminController.addDonation); // Handle file upload

router.get("/feedback", AdminController.feedback);

router.delete("/delete-comment/:id", AdminController.deleteComment);

router.get("/profile", AdminController.profile);

router.get("/users", AdminController.users); // Menampilkan daftar user
router.get("/add-user", AdminController.addUser); // Menampilkan form tambah user
// Rute POST untuk menambahkan user
router.post("/add-user", AdminController.addUser); // Menangani form tambah user
// Route untuk menghapus user
router.delete("/delete-user/:id", AdminController.deleteUser);
router.get("/edit-user/:id", AdminController.editUser);
// Menambahkan route untuk menangani POST request pada update user
router.post("/edit-user/:id", AdminController.updateUser);
// Route untuk menghapus feedback
router.delete("/delete-feedback/:id", AdminController.deleteFeedback);

module.exports = router;
