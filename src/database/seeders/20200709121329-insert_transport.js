export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("Transports", [{
        brand: "Grab",
        slug: "grab",
        fee: 0.15,
        status: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
     },
     {
        brand: "Bee",
        slug: "bee",
        fee: 0.15,
        status: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      {
        brand: "VnExpress",
        slug: "vnexpress",
        fee: 0.15,
        status: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
     },
    {
        brand: "GiaoHangNhanh",
        slug: "giaohangnhanh",
        fee: 0.15,
        status: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
    },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Transports", null, {});
  },
};
