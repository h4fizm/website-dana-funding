const express = require("express");
const router = express.Router();
const DonationController = require("../controllers/DonationController");

// Tambahkan rute untuk menampilkan halaman donasi
router.get("/donation/:id", DonationController.getDonationDetails);

module.exports = router;