const express = require("express");
const router = express.Router();
const CatalogController = require("../controllers/CatalogController");
const CrowdFunding = require("../models/CrowdFunding");

// Middleware autentikasi
function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect("/login");
}

router.get("/user/catalogfavorit", isAuthenticated, CatalogController.showCatalogFavorit);
router.get("/user/catalog", isAuthenticated, async (req, res) => {
  const crowdfunds = await CrowdFunding.findAll();

  // Resolve getDanaTerkumpul for each crowdfund
  const crowdfundData = await Promise.all(crowdfunds.map(async (crowdfund) => {
    const danaTerkumpul = await crowdfund.getDanaTerkumpul();
    return {
      ...crowdfund.toJSON(),
      danaTerkumpul, // Add the resolved value to the crowdfund object
    };
  }));
  
  res.render("user/main", {
    title: "Catalog",
    user: req.session.user,
    content: "catalog",
    crowdfunds: crowdfundData,
  });
});

module.exports = router;
