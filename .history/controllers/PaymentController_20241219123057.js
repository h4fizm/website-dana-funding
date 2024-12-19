const Payment = require("../models/Payment");

class PaymentController {
  // Method untuk menampilkan form pembayaran
  static async renderPaymentForm(req, res) {
    try {
      const { crowdfundId } = req.params; // Ambil ID Crowdfund dari parameter URL
      const userId = req.session.userId; // Ambil user ID dari session (sesuaikan dengan sistem autentikasi Anda)

      // Ambil data crowdfund berdasarkan ID
      const crowdfund = await Crowdfund.findByPk(crowdfundId);

      if (!crowdfund) {
        return res.status(404).send("Crowdfund not found");
      }

      // Ambil data user berdasarkan ID (opsional, hanya jika butuh data user)
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).send("User not found");
      }

      // Render view form payment
      return res.render("user/menu/payment", {
        crowdfund,
        user,
      });
    } catch (error) {
      console.error("Error rendering payment form:", error);
      return res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = PaymentController;
