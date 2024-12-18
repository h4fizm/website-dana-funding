"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("crowdfunds", [
      {
        crowdfund_title: "Donasi untuk Pembangunan Sekolah",
        crowdfund_description:
          "Membantu membangun sekolah di daerah terpencil.",
        crowdfund_image: "https://example.com/images/sekolah.jpg", // Example URL
        status: "DIBUKA",
        id_user: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        crowdfund_title: "Bantuan untuk Korban Bencana Alam",
        crowdfund_description: "Memberikan bantuan kepada korban bencana alam.",
        crowdfund_image: "https://example.com/images/bencana.jpg", // Example URL
        status: "DIBUKA",
        id_user: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("crowdfunds", null, {});
  },
};
