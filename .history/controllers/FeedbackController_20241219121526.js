const Feedback = require("../models/Feedback");

const submitFeedback = async (req, res) => {
  try {
    const { name, email, message, anonymous } = req.body;

    // Validasi input
    if (!anonymous && (!name || !email)) {
      return res.status(400).json({
        message: "Nama dan email harus diisi untuk feedback non-anonymous",
      });
    }

    if (!message) {
      return res.status(400).json({
        message: "Pesan harus diisi",
      });
    }

    // Proses data feedback
    const feedbackData = {
      name: anonymous ? "Anonymous" : name,
      email: anonymous ? "anonymous@example.com" : email,
      message: message.trim()
    };

    // Simpan data ke database
    const feedback = await Feedback.create(feedbackData);

    res.status(201).json({
      message: "Feedback berhasil disimpan",
      data: feedback,
    });
  } catch (err) {
    console.error("Error saving feedback:", err);
    res.status(500).json({
      message: "Terjadi kesalahan server.",
      error: err.message,
    });
  }
};

module.exports = {
  submitFeedback,
};
