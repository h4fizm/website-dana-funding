const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db"); // Import koneksi database

const Feedback = db.define(
  "Feedback",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "feedbacks",
    underscored: true, // Gunakan snake_case untuk kolom
    timestamps: true,
  }
);

module.exports = Feedback;
