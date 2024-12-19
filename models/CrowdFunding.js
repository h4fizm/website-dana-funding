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

CrowdFunding.getFavoriteCrowdfundsByUser = async function(userId) {
  const favoriteCrowdfunds = await sequelize.query(`
      SELECT c.*
      FROM favoritecrowdfunds fc
      JOIN crowdfunds c ON fc.id_crowdfund = c.id
      WHERE fc.id_user = :userId
  `, {
      replacements: { userId },
      model: CrowdFunding,
      mapToModel: true, // This will map the results to the CrowdFunding model
  });
  return favoriteCrowdfunds;
};

module.exports = CrowdFunding;