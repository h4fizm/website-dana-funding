const express = require("express");
const db = require("./config/db"); // Import koneksi database
const app = express();

// Middleware
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.send("Welcome to Donasi App API!");
});

// Import routes
const apiRoutes = require("./routes");
app.use("/api", apiRoutes);

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
