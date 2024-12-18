"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("donations", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      payment_method: {
        type: Sequelize.ENUM("QRIS", "TF"),
        allowNull: true, // Bisa bernilai NULL
      },
      bank: {
        type: Sequelize.ENUM("BNI", "BRI", "BCA", "Mandiri", "BSI"),
        allowNull: true, // Bisa bernilai NULL
      },
      id_crowdfund: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "crowdfunds", // Referensi ke tabel 'crowdfunds'
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Reference to the 'users' table
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("donations");
  },
};
