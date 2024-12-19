exports.getDonationsPage = (req, res) => {
  res.render("admin/menu/donationtable", { layout: "dashboard" });
};

exports.getFeedbackPage = (req, res) => {
  res.render("admin/menu/feedbacktable", { layout: "dashboard" });
};

exports.getUsersPage = (req, res) => {
  res.render("admin/menu/usertable", { layout: "dashboard" });
};

exports.getProfilePage = (req, res) => {
  res.render("admin/menu/profile", { layout: "dashboard" });
};
