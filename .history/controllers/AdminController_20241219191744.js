class AdminController {
  static donations(req, res) {
    res.render("admin/dashboard", { page: "donations" });
  }
}

module.exports = AdminController;
