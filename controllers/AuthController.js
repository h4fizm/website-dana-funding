const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Model User

// Fungsi untuk menangani login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cek apakah user dengan email tersebut ada
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.render("login", { errorMessage: "Email atau password salah" });
    }

    // Verifikasi password yang dimasukkan dengan yang ada di database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { errorMessage: "Email atau password salah" });
    }

    // Menyimpan user ke dalam session setelah login berhasil
    req.session.user = { id: user.id, email: user.email, role: user.role };
    console.log('User session data:', req.session.user);

    // Redirect berdasarkan role
    if (user.role === "admin") {
      return res.redirect("/admin/dashboard");
    } else {
      return res.redirect("/user/catalog");
    }
  } catch (error) {
    console.error("Login error: ", error);
    return res.render("login", {
      errorMessage: "Terjadi kesalahan saat login",
    });
  }
};

// Fungsi untuk menangani register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validasi input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Semua kolom wajib diisi" });
    }

    // Validasi format email menggunakan regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Format email tidak valid" });
    }

    // Validasi panjang password minimal 5 karakter
    if (password.length < 5) {
      return res
        .status(400)
        .json({ message: "Password harus memiliki minimal 5 karakter" });
    }

    // Periksa apakah email sudah digunakan
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Hash password sebelum menyimpannya ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru dengan role 'user'
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user", // Secara eksplisit set role ke "user"
    });

    // Kirim response sukses
    res.status(201).json({ message: "Pendaftaran berhasil, silakan login." });
  } catch (error) {
    console.error("Register error: ", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat register",
      error: error.message,
    });
  }
};

// Fungsi untuk menangani logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/admin/dashboard"); // Jika logout gagal
    }
    res.redirect("/login"); // Jika logout berhasil
  });
};
