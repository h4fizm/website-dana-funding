const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs"); // Untuk enkripsi password
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          // Enkripsi password sebelum menyimpannya
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          // Enkripsi password jika ada perubahan
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

module.exports = User;
