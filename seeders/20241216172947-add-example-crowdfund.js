"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("crowdfunds", [
      {
        crowdfund_title: "Donasi untuk Pembangunan Sekolah",
        crowdfund_description:
          "Membantu membangun sekolah di daerah terpencil.",
        crowdfund_image: "https://picsum.photos/id/1/400",
        target_dana: 10000000,
        status: "DIBUKA",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        crowdfund_title: "Bantuan untuk Korban Bencana Alam",
        crowdfund_description: "Memberikan bantuan kepada korban bencana alam.",
        crowdfund_image: "https://picsum.photos/id/2/400",
        target_dana: 20000000,
        status: "DIBUKA",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("crowdfunds", null, {});
  },
};
