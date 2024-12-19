const express = require("express");
const router = express.Router();

// Rute untuk setiap menu
router.get("/donations", (req, res) => {
  res.render("admin/menu/donationtable"); // Menampilkan daftar donasi
});

router.get("/feedback", (req, res) => {
  res.render("admin/menu/feedbacktable"); // Menampilkan daftar feedback
});

router.get("/users", (req, res) => {
  res.render("admin/menu/usertable"); // Menampilkan daftar user
});

router.get("/profile", (req, res) => {
  res.render("admin/menu/profile"); // Menampilkan profil
});

module.exports = router;
