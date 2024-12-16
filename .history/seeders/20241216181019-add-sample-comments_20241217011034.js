"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("comments", [
      {
        comment: "This is a great crowdfunding campaign!",
        id_crowdfund: 1, // Pastikan ID crowdfund sesuai dengan data di tabel 'crowdfunds'
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        comment: "Looking forward to the success of this project!",
        id_crowdfund: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
