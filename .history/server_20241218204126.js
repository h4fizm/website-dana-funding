const express = require("express");
const path = require("path");
const session = require("express-session");
const db = require("./config/db");
const app = express();
// Import donation routes
const donationRoutes = require("./routes/donation");
app.use("/", donationRoutes); // Gunakan rute donation

require("dotenv").config();

// Set EJS sebagai template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Import auth routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Import catalog routes
const catalogRoutes = require("./routes/catalog");
app.use("/", catalogRoutes); // Pastikan sudah di-import dan digunakan

// Import profil routes
const profilRoutes = require('./routes/profil');
app.use('/', profilRoutes);

// Import feedback routes
const feedbackRoutes = require('./routes/feedback');
app.use('/api/feedbacks', feedbackRoutes);

// Admin dan user routes
app.get("/admin/dashboard", isAdmin, (req, res) =>
  res.render("admin/dashboard")
);

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

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
