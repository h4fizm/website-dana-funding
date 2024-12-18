exports.getDonationDetail = (req, res) => {
  // Kirimkan halaman EJS untuk desain
  res.render("userdonation", {
    title: "Detail Donasi", // Contoh data statis yang dikirim ke EJS
  });
};
