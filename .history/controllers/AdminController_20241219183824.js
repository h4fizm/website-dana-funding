const AdminController = {
  showDashboard: (req, res) => {
    res.render("admin/dashboard", { activePage: "dashboard" });
  },

  showDonations: (req, res) => {
    res.render("admin/dashboard", { activePage: "donations" });
  },

  showFeedback: (req, res) => {
    res.render("admin/dashboard", { activePage: "feedback" });
  },

  showUsers: (req, res) => {
    res.render("admin/dashboard", { activePage: "users" });
  },

  showProfile: (req, res) => {
    res.render("admin/dashboard", { activePage: "profile" });
  },
};

module.exports = AdminController;
