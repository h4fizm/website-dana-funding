// routes/adminRouter.js
const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

// Rute untuk halaman dashboard
router.get("/dashboard", AdminController.showDashboard);

// Rute lainnya (donations, feedback, dll.)
router.get("/donations", (req, res) => {
  res.render("admin/menu/donationtable", { activePage: "donations" });
});

router.get("/feedback", (req, res) => {
  res.render("admin/menu/feedbacktable", { activePage: "feedback" });
});

router.get("/users", (req, res) => {
  res.render("admin/menu/usertabel", { activePage: "users" });
});

router.get("/profile", (req, res) => {
  res.render("admin/menu/userprofile", { activePage: "profile" });
});

module.exports = router;
