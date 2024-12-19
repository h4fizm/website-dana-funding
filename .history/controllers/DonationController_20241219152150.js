const Donation = require("../models/Donation");
const CrowdFunding = require("../models/CrowdFunding");

exports.getDonationDetails = async (req, res) => {
  const donationId = req.params.id; // Ambil ID donasi dari parameter
  const donation = await Donation.findByPk(donationId); // Ambil data donasi dari database

  if (!donation) {
    return res.status(404).send("Donation not found");
  }

  const danaTerkumpul = await donation.getDanaTerkumpul(); // Hitung total dana terkumpul

  const crowdfund = await CrowdFunding.findByPk(donation.id_crowdfund);

  if (!crowdfund) {
    return res.status(404).send("Crowdfunding not found");
  }

  // Render view langsung dengan path yang dipartisi
  res.render("user/menu/donation", {
    donation: {
      ...donation.toJSON(), // Konversi instance ke object biasa
      danaTerkumpul, // Tambahkan dana terkumpul ke objek donasi
    },
    crowdfund: crowdfund.toJSON(), // Kirim data crowdfunding ke view
  });
};
