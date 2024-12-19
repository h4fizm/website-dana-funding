const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Model User
const Feedback = require("../models/Feedback"); // Model User
const Crowdfund = require("../models/CrowdFunding"); // Model Crowdfund
const FavoriteCrowdfund = require("../models/FavoriteCrowdfund"); // Model FavoriteCrowdfund
const Comment = require("../models/Comment");
const Donation = require("../models/Donation");

class AdminController {
  // Controller untuk menampilkan data feedback
  static async feedback(req, res) {
    try {
      // Ambil semua data feedback dari database
      const feedbacks = await Feedback.findAll();

      // Render halaman dengan data feedback yang dikirimkan
      res.render("admin/dashboard", {
        page: "feedback",
        feedbacks: feedbacks, // Kirim data feedback ke tampilan
      });
    } catch (error) {
      console.error("Error fetching feedback data:", error);
      res.status(500).send("Internal Server Error");
    }
  }

   // Fungsi untuk menghapus feedback
static deleteFeedback(req, res) {
  const feedbackId = req.params.id;
  console.log("Menghapus feedback dengan ID:", feedbackId);

  // Hapus feedback berdasarkan ID
  Feedback.destroy({
    where: { id: feedbackId },
  })
    .then(() => {
      res.status(200).json({ message: "Feedback berhasil dihapus" }); // Kirim respons sukses
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Terjadi kesalahan saat menghapus feedback." }); // Kirim respons error
    });
}


  static profile(req, res) {
    res.render("admin/dashboard", { page: "profile" });
  }

  static users(req, res) {
    res.render("admin/dashboard", { page: "users" });
  }

  static users(req, res) {
    // Ambil semua data user dari database
    User.findAll()
      .then((users) => {
        res.render("admin/dashboard", { page: "users", users });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Terjadi kesalahan saat mengambil data pengguna.");
      });
  }

  static addUser(req, res) {
    if (req.method === "GET") {
      res.render("admin/dashboard", { page: "adduser" });
    } else if (req.method === "POST") {
      // Ambil data dari form
      const { name, email, password, role } = req.body;

      // Validasi input jika perlu
      if (!name || !email || !password || !role) {
        return res.status(400).send("Semua field harus diisi.");
      }

      // Simpan data ke database
      User.create({
        name,
        email,
        password, // Password sebaiknya dienkripsi, Anda bisa menggunakan bcrypt atau library lain
        role,
      })
        .then(() => {
          // Redirect ke halaman users setelah berhasil menyimpan
          res.redirect("/admin/users");
        })
        .catch((err) => {
          // Tangani error jika ada
          console.error(err);
          res.status(500).send("Terjadi kesalahan saat menambahkan user.");
        });
    }
  }
  static deleteUser(req, res) {
    const userId = req.params.id;

    // Hapus user berdasarkan ID
    User.destroy({
      where: { id: userId },
    })
      .then(() => {
        res.redirect("/admin/users"); // Redirect setelah menghapus
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Terjadi kesalahan saat menghapus user.");
      });
  }

  static editUser(req, res) {
    const userId = req.params.id;

    // Gunakan findByPk untuk mencari user berdasarkan primary key (id)
    User.findByPk(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send("User not found");
        }
        res.render("admin/dashboard", { page: "edituser", user });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving user data");
      });
  }

  static updateUser(req, res) {
    const userId = req.params.id;
    const { name, email, password, role } = req.body;

    // Validasi input jika perlu
    if (!name || !email || !role) {
      return res.status(400).send("Semua field harus diisi.");
    }

    // Cari user berdasarkan ID
    User.findByPk(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send("User tidak ditemukan");
        }

        // Update data user
        user.name = name;
        user.email = email;
        user.role = role;

        // Jika password diisi, enkripsi dan update
        if (password) {
          user.password = bcrypt.hashSync(password, 10);
        }

        // Simpan perubahan ke database
        user
          .save()
          .then(() => {
            res.redirect("/admin/users"); // Redirect ke halaman users setelah berhasil update
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send("Terjadi kesalahan saat memperbarui user.");
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saat mengambil data user.");
      });
  }

  static async addDonation(req, res) {
    if (req.method === "POST") {
      console.log("Received POST request for adding donation.");
      
      try {
        // Log the incoming request body
        console.log("Request Body:", req.body);
        
        const { crowdfund_title, crowdfund_description, target_dana, status } = req.body;
        const crowdfund_image = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null; // Construct the full URL

        // Log the uploaded file information
        console.log("Uploaded File URL:", crowdfund_image);
        
        // Validate user ID from session
        if (!req.session.user || !req.session.user.id) {
          console.error("User ID not found in session.");
          return res.status(400).send("User not authenticated.");
        }

        // Create a new crowdfund entry
        const newCrowdfund = await Crowdfund.create({
          crowdfund_title,
          crowdfund_description,
          crowdfund_image, // Save the full URL
          target_dana,
          status,
          id_user: req.session.user.id, // Assuming you have user ID in session
          created_at: new Date(), // Set created_at to current date
          updated_at: new Date()  // Set updated_at to current date
        });

        console.log("New Crowdfund Created:", newCrowdfund);
      res.redirect("/admin/donations"); // Redirect to donations page after successful addition
      } catch (error) {
        console.error("Error adding crowdfund:", error);
        res.status(500).send("Internal Server Error");
      }
    } else {
      res.render("admin/dashboard", { page: "adddonation" });
    }
  }

  static updateProfile(req, res) {
    console.log(req.session.user); // Tambahkan log untuk memeriksa isi req.session.user
    const userId = req.session.user.id; // Ambil ID pengguna dari session
    const { name, email, password } = req.body;

    // Validasi input jika perlu
    if (!name || !email) {
      return res.status(400).send("Semua field harus diisi.");
    }

    // Cari user berdasarkan ID
    User.findByPk(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send("User tidak ditemukan");
        }

        // Update data user
        user.name = name;
        user.email = email;

        // Jika password diisi, enkripsi dan update
        if (password) {
          user.password = bcrypt.hashSync(password, 10);
        }

        // Simpan perubahan ke database
        user
          .save()
          .then(() => {
            res.redirect("/admin/profile"); // Redirect ke halaman profil setelah berhasil update
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send("Terjadi kesalahan saat memperbarui profil.");
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error saat mengambil data pengguna.");
      });
  }

  static async donations(req, res) {
    try {
      // Fetch all crowdfunds from the database
      const crowdfunds = await Crowdfund.findAll();

      const crowdfundData = await Promise.all(crowdfunds.map(async (crowdfund) => {
        const danaTerkumpul = await crowdfund.getDanaTerkumpul();
        return {
          ...crowdfund.toJSON(),
          danaTerkumpul, // Add the resolved value to the crowdfund object
        };
      }));

      res.render("admin/dashboard", { page: "donations", crowdfunds: crowdfundData }); // Pass crowdfunds to the view
    } catch (error) {
      console.error("Error fetching crowdfunds:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async deleteCrowdfund(req, res) {
    const crowdfundId = req.params.id; // Get the ID from the URL parameters
    console.log("Deleting crowdfund with ID:", crowdfundId);

    try {
      // First, delete all related entries in FavoriteCrowdfund
      await FavoriteCrowdfund.destroy({
        where: { id_crowdfund: crowdfundId },
      });

      // Then, delete the crowdfund itself
      const result = await Crowdfund.destroy({
        where: { id: crowdfundId },
      });

      if (result === 0) {
        // If no rows were affected, the crowdfund was not found
        console.error("Crowdfund not found.");
        return res.status(404).redirect("/admin/donations"); // Redirect to donations page if not found
      }

      console.log("Crowdfund successfully deleted.");
      res.redirect("/admin/donations"); // Redirect to donations page after successful deletion
    } catch (err) {
      console.error("Error deleting crowdfund:", err);
      res.status(500).redirect("/admin/donations"); // Redirect to donations page on error
    }
  }

  static async editCrowdfund(req, res) {
    const crowdfundId = req.params.id;

    // Fetch crowdfund by ID
    const crowdfund = await Crowdfund.findByPk(crowdfundId);
    if (!crowdfund) {
      return res.status(404).send("Crowdfund not found");
    }
    res.render("admin/dashboard", { page: "editcrowdfund", crowdfund });
  }

  static async detailCrowdfund(req, res) {
    console.log("Accessing detailCrowdfund with ID:", req.params.id);
    try {
      const donationId = req.params.id; // Get the donation ID from the request parameters
      const donation = await Donation.findByPk(donationId); // Fetch the donation from the database
  
      if (!donation) {
        // If no donation is found, set danaTerkumpul to 0
        const crowdfund = await Crowdfund.findByPk(donationId);
  
        if (!crowdfund) {
          return res.status(404).send("Crowdfunding not found");
        }
  
        const comments = await Comment.findAll({
          where: { id_crowdfund: donationId },
          order: [['created_at', 'DESC']],
        });
  
        return res.render("admin/menu/detaildonation", {
          donation: {
            danaTerkumpul: 0, // No donations yet, so set to 0
          },
          crowdfund: crowdfund.toJSON(),
          comments: comments.map(comment => comment.toJSON()),
        });
      }
  
      // Fetch the total amount collected for this donation
      const danaTerkumpul = await donation.getDanaTerkumpul() || 0; // Default to 0 if undefined
  
      const crowdfund = await Crowdfund.findByPk(donation.id_crowdfund);
  
      if (!crowdfund) {
        return res.status(404).send("Crowdfunding not found");
      }
  
      const comments = await Comment.findAll({
        where: { id_crowdfund: donation.id_crowdfund },
        order: [['created_at', 'DESC']],
      });
  
      res.render("admin/menu/detaildonation", {
        donation: {
          ...donation.toJSON(), // Convert the donation instance to a plain object
          danaTerkumpul, // Add the total amount collected to the donation object
        },
        crowdfund: crowdfund.toJSON(),
        comments: comments.map(comment => comment.toJSON()),
      });
    } catch (error) {
      console.error("Error fetching donation details:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async deleteComment(req, res) {
    const commentId = req.params.id;
    try {
      const result = await Comment.destroy({
        where: { id: commentId },
      });

      if (result === 0) {
        return res.status(404).send("Comment not found");
      }

      res.redirect("back"); // Redirect back to the previous page
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).send("Internal Server Error");
    }
  }

}

module.exports = AdminController;
