exports.getDonationsPage = (req, res) => {
  res.render("admin/menu/donationtable");
};

exports.getFeedbackPage = (req, res) => {
  res.render("admin/menu/feedbacktable");
};

exports.getUsersPage = (req, res) => {
  res.render("admin/menu/usertable");
};

exports.getProfilePage = (req, res) => {
  res.render("admin/menu/profile");
};
