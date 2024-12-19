const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/PaymentController");

// Route untuk menampilkan form pembayaran
router.get("/payment", PaymentController.renderPaymentForm);

module.exports = router;
