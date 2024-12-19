const Payment = require("../models/Payment");

class PaymentController {
  // Method untuk menampilkan form pembayaran
  static async renderPaymentForm(req, res) {
    try {
      // Render view form payment tanpa data tambahan
      return res.render("user/menu/payment");
    } catch (error) {
      console.error("Error rendering payment form:", error);
      return res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = PaymentController;

module.exports = PaymentController;
