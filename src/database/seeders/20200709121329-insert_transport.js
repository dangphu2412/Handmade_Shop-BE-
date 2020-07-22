module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Transports", [{
        brand: "Grab",
        fee: 0.15,
        status: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
     },
     {
        brand: "Bee",
        fee: 0.15,
        status: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      {
        brand: "VnExpress",
        fee: 0.15,
        status: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
     },
    {
        brand: "GiaoHangNhanh",
        fee: 0.15,
        status: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
    },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Transports", null, {});
  },
};
