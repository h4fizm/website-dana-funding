const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        name: "Admin User",
        email: "admin@admin.com",
        password: bcrypt.hashSync("12345678", 10), // Hash password
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Regular User",
        email: "user@user.com",
        password: bcrypt.hashSync("12345678", 10), // Hash password
        role: "user",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
