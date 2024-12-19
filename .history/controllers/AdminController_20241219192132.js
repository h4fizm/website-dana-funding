class AdminController {
  static donations(req, res) {
    res.render("admin/dashboard", { page: "donations" });
  }

  static feedback() {
    res.render('admin/feedback', {page: 'feedback'})
  }
}

module.exports = AdminController;
