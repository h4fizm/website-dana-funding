class AdminController {
  static donations(req, res) {
    res.render("admin/dashboard", { page: "donations" });
  }

  static feedback(req, res) {
    res.render("admin/dashboard", { page: "feedback" });
  }
  static users(req, res) {
    res.render("admin/dashboard", { page: "users" });
  }
  static profile(req, res) {
    res.render("admin/dashboard", { page: "profile" });
  }
  static addUser(req, res) {
    res.render("admin/dashboard", { page: "adduser" });
  }
  static addDonation(req, res) {
    res.render("admin/dashboard", { page: "add" });
  }
}

module.exports = AdminController;
