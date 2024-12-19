const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Model User
const Feedback = require("../models/Feedback"); // Model User

class AdminController {
  static donations(req, res) {
    res.render("admin/dashboard", { page: "donations" });
  }

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

  static addDonation(req, res) {
    res.render("admin/dashboard", { page: "adddonation" });
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

 
}

module.exports = AdminController;
