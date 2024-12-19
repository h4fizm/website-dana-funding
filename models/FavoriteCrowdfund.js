const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const FavoriteCrowdfund = sequelize.define(
  "FavoriteCrowdfund",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Assuming you have a users table
        key: "id",
      },
    },
    id_crowdfund: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "crowdfunds", // Assuming you have a crowdfunds table
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    },
  },
  {
    tableName: "favoritecrowdfunds",
    timestamps: false, // We are using custom created_at and updated_at fields
  }
);

module.exports = FavoriteCrowdfund;