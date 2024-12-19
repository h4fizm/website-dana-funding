const express = require("express");
const router = express.Router();
const AdminControllerController = require("../controllers/AdminController");

// Route Daftar Donasi
router.get("/donations", (req, res) => {
  res.render("admin/menu/donationtable", { activePage: "donations" });
});

// Route Feedback
router.get("/feedback", (req, res) => {
  res.render("admin/menu/feedbacktable", { activePage: "feedback" });
});

// Route User
router.get("/users", (req, res) => {
  res.render("admin/menu/usertabel", { activePage: "users" });
});

// Route Profil
router.get("/profile", (req, res) => {
  res.render("admin/menu/userprofile", { activePage: "profile" });
});

module.exports = router;
