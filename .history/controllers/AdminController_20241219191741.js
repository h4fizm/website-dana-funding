class AdminController {
  static donations(req, res) {
    res.render("admin/dashboard", { page: ''});
  }
}

module.exports = AdminController;
