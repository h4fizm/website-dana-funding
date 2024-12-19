const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/PaymentController");

// Rute untuk menampilkan form pembayaran
router.get("/payment/:crowdfundId", PaymentController.renderPaymentForm);

module.exports = router;
