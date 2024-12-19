const Donation = require("../models/Donation");
const CrowdFunding = require("../models/CrowdFunding");
const Comment = require("../models/Comment");

exports.getDonationDetails = async (req, res) => {
  try {
    const crowdfundId = req.params.id; // Get the crowdfund ID from the request parameters
    const donation = await Donation.findOne({ where: { id_crowdfund: crowdfundId } }); // Fetch the donation from the database using the crowdfund ID

    if (!donation) {
      // If no donation is found, set danaTerkumpul to 0
      const crowdfund = await CrowdFunding.findByPk(crowdfundId);

      if (!crowdfund) {
        return res.status(404).send("Crowdfunding not found");
      }

      const comments = await Comment.findAll({
        where: { id_crowdfund: crowdfundId },
        order: [['created_at', 'DESC']],
      });

      return res.render("user/menu/donation", {
        donation: {
          danaTerkumpul: 0, // No donations yet, so set to 0
        },
        crowdfund: crowdfund.toJSON(),
        comments: comments.map(comment => comment.toJSON()),
      });
    }

    // Fetch the total amount collected for this donation
    const danaTerkumpul = await donation.getDanaTerkumpul() || 0; // Default to 0 if undefined

    const crowdfund = await CrowdFunding.findByPk(donation.id_crowdfund);

    if (!crowdfund) {
      return res.status(404).send("Crowdfunding not found");
    }

    const comments = await Comment.findAll({
      where: { id_crowdfund: donation.id_crowdfund },
      order: [['created_at', 'DESC']],
    });

    res.render("user/menu/donation", {
      donation: {
        ...donation.toJSON(), // Convert the donation instance to a plain object
        danaTerkumpul, // Add the total amount collected to the donation object
      },
      crowdfund: crowdfund.toJSON(),
      comments: comments.map(comment => comment.toJSON()),
    });
  } catch (error) {
    console.error("Error fetching donation details:", error);
    res.status(500).send("Internal Server Error");
  }
};
