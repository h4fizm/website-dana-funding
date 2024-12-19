const Payment = require("../models/Payment");

class PaymentController {
  // Method untuk menampilkan form pembayaran
  static async renderPaymentForm(req, res) {
    return res.render(path.join(__dirname, "../views/user/menu/payment.ejs"));

}

module.exports = PaymentController;


