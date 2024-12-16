'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'hashedpassword', // Ganti dengan hash password yang valid
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Regular User',
        email: 'user@example.com',
        password: 'hashedpassword', // Ganti dengan hash password yang valid
        role: 'user',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
