const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/PaymentController");

app.get("/test-payment", (req, res) => {
  res.render("user/menu/payment");
});

module.exports = router;
