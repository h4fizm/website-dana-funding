exports.getDonationDetail = (req, res) => {
  res.render("user/menu/donation", {
    title: "Detail Donasi",
    description: "Halaman ini berisi detail informasi donasi.",
  });
};
