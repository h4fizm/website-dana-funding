const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Model User

class AdminController {
  static donations(req, res) {
    res.render("admin/dashboard", { page: "donations" });
  }

  static feedback(req, res) {
    res.render("admin/dashboard", { page: "feedback" });
  }

  static users(req, res) {
    res.render("admin/dashboard", { page: "users" });
  }

  static profile(req, res) {
    res.render("admin/dashboard", { page: "profile" });
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
        res.redirect("/admin/users");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Terjadi kesalahan saat menghapus user.");
      });
  }

  static addDonation(req, res) {
    res.render("admin/dashboard", { page: "adddonation" });
  }
}

module.exports = AdminController;
