"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("feedbacks", [
      {
        name: "John Doe",
        email: "johndoe@example.com",
        message: "This is a feedback message.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Jane Smith",
        email: "janesmith@example.com",
        message: "Another feedback message.",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("feedbacks", null, {});
  },
};
