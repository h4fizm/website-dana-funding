const Donation = require("../models/Donation");
const CrowdFunding = require("../models/CrowdFunding");

exports.getDonationDetails = async (req, res) => {
  const donationId = req.params.id; // Get the donation ID from the request parameters
  const donation = await Donation.findByPk(donationId); // Fetch the donation from the database

  if (!donation) {
    return res.status(404).send("Donation not found");
  }

  const danaTerkumpul = await donation.getDanaTerkumpul(); // Fetch the total amount collected for this donation

  const crowdfund = await CrowdFunding.findByPk(donation.id_crowdfund);

  if (!crowdfund) {
    return res.status(404).send("Crowdfunding not found");
  }

  res.render("user/menu/donation", {
    donation: {
      ...donation.toJSON(), // Convert the donation instance to a plain object
      danaTerkumpul, // Add the total amount collected to the donation object
    },
    crowdfund: crowdfund.toJSON(),
  });
};
