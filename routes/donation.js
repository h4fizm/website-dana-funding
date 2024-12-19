const express = require("express");
const router = express.Router();
const DonationController = require("../controllers/DonationController");
const Donation = require("../models/Donation");

// Tambahkan rute untuk menampilkan halaman donasi
router.get("/donation/:id", DonationController.getDonationDetails);

router.post('/donate', async (req, res) => {
  const { id_crowdfund, value, payment_method, bank } = req.body;

  // Retrieve id_user from session
  const id_user = req.session && req.session.user ? req.session.user.id : null;

  const Session = req.session;
  const User_ID = id_user;

  // Initialize an array to hold missing fields
  const missingFields = [];

  // Validate required fields
  if (!id_crowdfund) missingFields.push('id_crowdfund');
  if (!id_user) missingFields.push('id_user');
  if (!value) missingFields.push('value');
  if (!payment_method) missingFields.push('payment_method');

  // If there are missing fields, return an error response
  if (missingFields.length > 0) {
    return res.redirect(`/payment?error=true&id_crowdfund=${id_crowdfund}`);
  }

  // Create a new donation entry
  try {
    const donation = await Donation.create({
      id_crowdfund,
      id_user,
      value,
      payment_method,
      bank: payment_method === 'TF' ? bank : null, // Only save bank if payment method is Transfer
    });

    return res.redirect(`/payment?success=true&id=${id_crowdfund}`);
  } catch (error) {
    console.error(error);
    return res.redirect(`/payment?error=true&id=${id_crowdfund}`);
  }
});

module.exports = router;
