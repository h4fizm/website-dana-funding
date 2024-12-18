const express = require("express");
const router = express.Router();

// Import controller
const donationController = require("../controllers/DonationController");

// Route untuk halaman detail donasi
router.get("/user/menu/donation", donationController.getDonationDetail);

module.exports = router;
