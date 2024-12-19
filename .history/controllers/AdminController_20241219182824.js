const path = require("path");

// Controller untuk halaman Admin
const AdminController = {
  // Menampilkan halaman daftar donasi
  showDonations: (req, res) => {
    res.render("admin/menu/donationtable", { activePage: "donations" });
  },

  // Menampilkan halaman daftar feedback
  showFeedback: (req, res) => {
    res.render("admin/menu/feedbacktable", { activePage: "feedback" });
  },

  // Menampilkan halaman daftar pengguna
  showUsers: (req, res) => {
    res.render("admin/menu/usertabel", { activePage: "users" });
  },

  // Menampilkan halaman profil pengguna
  showProfile: (req, res) => {
    res.render("admin/menu/userprofile", { activePage: "profile" });
  },
};

module.exports = AdminController;
