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

  static profile(req, res) {
    res.render("admin/dashboard", { page: "profile" });
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

      // Enkripsi password sebelum menyimpan
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .send("Terjadi kesalahan saat mengenkripsi password.");
        }

        // Simpan data ke database
        User.create({
          name,
          email,
          password: hashedPassword, // Simpan password yang terenkripsi
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

  // Menampilkan form edit user
  static async editUser(req, res) {
    const userId = req.params.id;
    try {
      const user = await User.findByPk(userId); // Menggunakan findByPk untuk Sequelize
      if (!user) {
        return res.status(404).send("User tidak ditemukan");
      }
      res.render("admin/edit-user", { user });
    } catch (err) {
      console.error(err);
      res.status(500).send("Terjadi kesalahan saat mengambil data pengguna.");
    }
  }

  // Menangani pembaruan user
  static async editUserPost(req, res) {
    const userId = req.params.id;
    const { name, email, password, role } = req.body;
    const updateData = { name, email, role };

    if (password) {
      // Jika password diubah, enkripsi password baru
      updateData.password = await bcrypt.hash(password, 10);
    }

    try {
      const user = await User.findByPk(userId); // Menggunakan findByPk untuk Sequelize
      if (!user) {
        return res.status(404).send("User tidak ditemukan");
      }

      await user.update(updateData); // Mengupdate data user
      res.redirect("/admin/users");
    } catch (err) {
      console.error(err);
      res.status(500).send("Terjadi kesalahan saat memperbarui data pengguna.");
    }
  }

  static addDonation(req, res) {
    res.render("admin/dashboard", { page: "adddonation" });
  }
}

module.exports = AdminController;
module.exports = AdminController;
