'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('crowdfunds', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      crowdfund_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      crowdfund_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('DIBUKA', 'DITUTUP'),
        allowNull: false,
        defaultValue: 'DIBUKA', // Default status is 'DIBUKA'
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // Referencing the 'users' table
          key: 'id',
        },
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('crowdfunds');
  },
};
