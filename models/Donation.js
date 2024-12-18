const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Donation = sequelize.define(
  "Donation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_crowdfund: {
      type: DataTypes.INTEGER,
      references: {
        model: "crowdfunds", // Updated model name
        key: "id",
      },
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT, // Changed from INTEGER to FLOAT
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM("QRIS", "TF"), // Added payment_method field
      allowNull: true,
    },
    bank: {
      type: DataTypes.ENUM("BNI", "BRI", "BCA", "Mandiri", "BSI"), // Added bank field
      allowNull: true,
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
    tableName: "donations",
    timestamps: true,
    underscored: true,
  }
);

Donation.prototype.getDanaTerkumpul = async function() {
  const donations = await Donation.findAll({
    where: { id_crowdfund: this.id_crowdfund },
  });
  const totalDonations = donations.reduce((acc, donation) => acc + donation.value, 0) || 0;
  return totalDonations;
};

module.exports = Donation;