"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("favoritecrowdfunds", [
      {
        id_user: 2, // ID User yang pertama (admin)
        id_crowdfund: 1, // ID Crowdfund yang pertama
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_user: 2, // ID User yang kedua (user)
        id_crowdfund: 2, // ID Crowdfund yang kedua
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("favoritecrowdfunds", null, {});
  },
};
