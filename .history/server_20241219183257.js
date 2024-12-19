const express = require("express");
const path = require("path");
const session = require("express-session");
const morgan = require("morgan");
const db = require("./config/db");
require("dotenv").config();

const app = express();

// Middleware untuk parsing, file statis, dan logging
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Konfigurasi session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
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

// Set EJS sebagai template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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
const adminRoutes = require("./routes/adminRouter");
app.use("/admin", isAdmin, adminRoutes);


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
  res.status(500).render("error", { message: err.message });
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
