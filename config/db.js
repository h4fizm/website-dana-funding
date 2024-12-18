const { Sequelize } = require("sequelize");
require("dotenv").config();

// Membuat koneksi database menggunakan Sequelize
const db = new Sequelize(
  process.env.DB_NAME, // Nama database
  process.env.DB_USER, // Username
  process.env.DB_PASSWORD, // Password
  {
    host: process.env.DB_HOST,
    dialect: "mysql", // Menggunakan MySQL sebagai database
    logging: false, // Matikan logging SQL query jika tidak dibutuhkan
  }
);

// Test koneksi database
db.authenticate()
  .then(() => {
    console.log("Connected to MySQL database with Sequelize!");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err.message);
  });

module.exports = db;
