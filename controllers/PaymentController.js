const Payment = require("../models/Payment");
const Crowdfund = require("../models/CrowdFunding");

class PaymentController {
  // Method untuk menampilkan form pembayaran
  static async renderPaymentForm(req, res) {
    try {
      const crowdfundId = req.query.id;
      const crowdfund = await Crowdfund.findOne({ where: { id: crowdfundId } });

      if (!crowdfund) {
        return res.status(404).send("Crowdfund not found");
      }

      return res.render("user/menu/payment", { crowdfund });
    } catch (error) {
      console.error("Error rendering payment form:", error);
      return res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = PaymentController;
