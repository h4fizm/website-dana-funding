class AdminController {
  static donations(req, res) {
    res.render("admin/dashboard", { page: "donations" });
  }

  static feedback(req, res) {
    res.render("admin/dashboard", { page: "feedback" });
  }
  static feedback(req, res) {
    res.render("admin/dashboard", { page: "f" });
  }
  static feedback(req, res) {
    res.render("admin/dashboard", { page: "feedback" });
  }
}

module.exports = AdminController;
