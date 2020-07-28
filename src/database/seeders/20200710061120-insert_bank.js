export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("Banks", [{
      name: "SBTC",
      slug: "sbtc",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      name: "Đông Á",
      slug: "dong-a",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      name: "Vietcombank",
      slug: "vietcombank",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      name: "Techcombank",
      slug: "techcombank",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      name: "Quân đội",
      slug: "quan-doi",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    ]);
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
