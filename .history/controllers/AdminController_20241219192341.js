class AdminController {
  static donations(req, res) {
    res.render("admin/dashboard", { page: "donations", active: '' });
  }

  static feedback(req, res) {
    res.render("admin/dashboard", { page: "feedback" });
  }
}

module.exports = AdminController;
