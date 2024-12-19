const express = require("express");
const router = express.Router();
const DonationController = require("../controllers/DonationController");
const Donation = require("../models/Donation");
const FavoriteCrowdfund = require("../models/FavoriteCrowdfund");
const { sequelize } = require("../config/db");
const Comment = require("../models/Comment");

router.post('/favorite', async (req, res) => {
    const { id_crowdfund } = req.body;
  
    // Retrieve id_user from session
    const id_user = req.session && req.session.user ? req.session.user.id : null;
  
    // Check if user is logged in
    if (!id_user) {
      return res.status(401).json({ error: "Anda belum login!" });
    }

    // Check if the crowdfund is already favorited by the user
    const existingFavorite = await FavoriteCrowdfund.findOne({
      where: { id_user, id_crowdfund }
    });

    if (existingFavorite) {
      return res.status(400).json({ error: "Program ini sudah pernah ditambahkan ke favorit!" });
    }
  
    // Insert into favoritecrowdfunds table using the model
    try {
      await FavoriteCrowdfund.create({
        id_user,
        id_crowdfund,
      });
  
      return res.status(200).json({ message: "Program donasi berhasil ditambahkan ke favorit!" });
    } catch (error) {
      console.error("Database Error:", error);
      return res.status(500).json({ error: "Gagal ditambahkan ke favorit!" });
    }
  });

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
    return res.redirect(`/payment?error=true&id=${id_crowdfund}`);
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

    return res.redirect(`/payment?success=true&id=${id_crowdfund}&value=${value}&method=${payment_method}`);
  } catch (error) {
    console.error(error);
    return res.redirect(`/payment?error=true&id=${id_crowdfund}`);
  }
});

router.post('/comment', async (req, res) => {
  const { id_crowdfund, comment } = req.body;

  // Insert the comment into the database
  try {
    await Comment.create({
      id_crowdfund,
      comment,
    });

    // Redirect back to the donation page to refresh comments
    return res.redirect(`/donation/${id_crowdfund}`);
  } catch (error) {
    console.error("Database Error:", error);
    return res.redirect(`/donation/${id_crowdfund}?error=true`);
  }
});

module.exports = router;
