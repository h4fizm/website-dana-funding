'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('crowdfunds', [
      {
        crowdfund_title: 'Donasi untuk Pembangunan Sekolah',
        crowdfund_description: 'Membantu membangun sekolah di daerah terpencil.',
        status: 'DIBUKA',
        id_user: 1, // Pastikan ID user yang ada sesuai dengan data yang ada di tabel users
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        crowdfund_title: 'Bantuan untuk Korban Bencana Alam',
        crowdfund_description: 'Memberikan bantuan kepada korban bencana alam.',
        status: 'DIBUKA',
        id_user: 2, // Pastikan ID user yang ada sesuai dengan data yang ada di tabel users
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('crowdfunds', null, {});
  },
};
