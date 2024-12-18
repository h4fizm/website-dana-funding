const express = require("express");
const router = express.Router();
const CatalogController = require("../controllers/CatalogController");

// Middleware autentikasi
function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect("/login");
}

router.get("/user/catalogfavorit", isAuthenticated, CatalogController.showCatalogFavorit);
router.get("/user/catalog", isAuthenticated, CatalogController.showCatalog);

module.exports = router;
