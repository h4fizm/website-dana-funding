"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("donations", [
      {
        value: 500000, // Jumlah donasi
        payment_method: "QRIS", // Metode pembayaran
        bank: null, // Bank kosong karena menggunakan QRIS
        id_crowdfund: 1, // ID crowdfund, pastikan ini sesuai dengan tabel `crowdfunds`
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        value: 1000000,
        payment_method: "TF",
        bank: "BCA", // Bank diisi karena metode TF
        id_crowdfund: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("donations", null, {});
  },
};
