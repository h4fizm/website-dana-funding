class AdminController {
  static donations(req, res) {
    res.render("admin/dashboard", { page: "donations" });
  }

  static feedback(req, res) {
    res.render("admin/dashboard", { page: "feedback" });
  }
  static users(req, res) {
    res.render("admin/dashboard", { page: "user" });
  }
  static feedback(req, res) {
    res.render("admin/dashboard", { page: "profile" });
  }
}

module.exports = AdminController;
