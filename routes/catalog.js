const express = require("express");
const router = express.Router();
const CatalogController = require("../controllers/CatalogController");
const CrowdFunding = require("../models/CrowdFunding");

// Middleware autentikasi
function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect("/login");
}

router.get("/user/catalogfavorit", isAuthenticated, async (req, res) => {
  // Get the user's favorite crowdfunds
  const favoriteCrowdfunds = await CrowdFunding.getFavoriteCrowdfundsByUser(req.session.user.id);

  // Resolve getDanaTerkumpul for each favorite crowdfund
  const favoriteCrowdfundData = await Promise.all(favoriteCrowdfunds.map(async (crowdfund) => {
    const danaTerkumpul = await crowdfund.getDanaTerkumpul();
    return {
      ...crowdfund.toJSON(),
      danaTerkumpul, // Add the resolved value to the crowdfund object
    };
  }));

  res.render("user/main", {
    title: "Wishlist Favorit",
    user: req.session.user,
    content: 'catalogfavorit',
    favoriteCrowdfunds: favoriteCrowdfundData // Pass favorite crowdfunds to the view
  });
});

router.get("/user/catalog", isAuthenticated, async (req, res) => {
  const crowdfunds = await CrowdFunding.findAll();

  // Resolve getDanaTerkumpul for each crowdfund and categorize them
  const crowdfundData = await Promise.all(crowdfunds.map(async (crowdfund) => {
    const danaTerkumpul = await crowdfund.getDanaTerkumpul();
    return {
      ...crowdfund.toJSON(),
      danaTerkumpul, // Add the resolved value to the crowdfund object
    };
  }));

  // Separate crowdfunds into open and closed
  const openCrowdfunds = crowdfundData.filter(crowdfund => crowdfund.status === 'DIBUKA');
  const closedCrowdfunds = crowdfundData.filter(crowdfund => crowdfund.status === 'DITUTUP');

  res.render("user/main", {
    title: "Catalog",
    user: req.session.user,
    content: "catalog",
    openCrowdfunds, // Pass open crowdfunds to the view
    closedCrowdfunds, // Pass closed crowdfunds to the view
  });
});

module.exports = router;
