require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override"); // Hanya sekali impor
const db = require("./config/db");

const app = express();

// Middleware untuk override method HTTP
app.use(methodOverride("_method"));

// Set EJS sebagai template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware untuk parsing dan file statis
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Konfigurasi session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Ubah menjadi true jika menggunakan HTTPS
  })
);

// Middleware autentikasi
function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect("/login");
}

function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === "admin") return next();
  res.redirect("/login");
}

// Rute utama
app.get("/", (req, res) => res.render("index"));

// Halaman login
app.get("/login", (req, res) => {
  const errorMessage = req.session.errorMessage || null;
  req.session.errorMessage = null;
  res.render("login", { errorMessage });
});

// Halaman register
app.get("/register", (req, res) => res.render("register"));

// Import dan gunakan rute-rute
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const catalogRoutes = require("./routes/catalog");
app.use("/", catalogRoutes);

const profilRoutes = require("./routes/profil");
app.use("/", profilRoutes);

const feedbackRoutes = require("./routes/feedback");
app.use("/api/feedbacks", feedbackRoutes);

const donationRoutes = require("./routes/donation");
app.use("/", donationRoutes);


const paymentRoutes = require("./routes/payment");
app.use("/", paymentRoutes);

// Admin route
const adminRouter = require("./routes/admin");
app.use("/admin", adminRouter); // Gunakan router admin di sini

// Logout
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect("/admin/dashboard");
    res.redirect("/login");
  });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong! Please try again later.");
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
