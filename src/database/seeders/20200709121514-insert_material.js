module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Materials", [
      {
        name: "Xương",
        slug: "xuong",
        status: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      {
        name: "Vãi",
        slug: "vai",
        status: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      {
        name: "Cotton",
        slug: "cotton",
        status: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      {
        name: "Da",
        slug: "da",
        status: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      {
        name: "Giấy",
        slug: "giay",
        status: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      {
        name: "Gỗ",
        slug: "go",
        status: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Materials", null, {});
  },
};
