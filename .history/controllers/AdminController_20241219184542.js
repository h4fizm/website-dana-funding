// Controller untuk halaman Admin
const AdminController = {
  // Menampilkan halaman dashboard
  showDashboard: (req, res) => {
    res.render("admin/dashboard", { activePage: "dashboard" });
  },

  // Rute lainnya...
};

module.exports = AdminController;
