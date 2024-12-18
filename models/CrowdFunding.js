const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Donation = require("./Donation");

const CrowdFunding = sequelize.define(
  "CrowdFunding",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    crowdfund_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    crowdfund_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    crowdfund_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    target_dana: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("DIBUKA", "DITUTUP"),
      allowNull: false,
      defaultValue: "DIBUKA",
    },
    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
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
    tableName: "crowdfunds",
    timestamps: true,
    underscored: true,
  }
);

CrowdFunding.prototype.getDanaTerkumpul = async function() {
    const donations = await Donation.findAll({
      where: { id_crowdfund: this.id },
    });
    const totalDonations = donations.reduce((acc, donation) => acc + donation.value, 0) || 0;
    return totalDonations;
};

module.exports = CrowdFunding;