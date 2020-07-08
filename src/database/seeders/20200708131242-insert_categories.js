'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Categories", [{
      name: "Áo quần",
      slug: "ao-quan",
      parentId: null,
      status: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    },
    {
      name: "Giày dép",
      slug: "giay-dep",
      parentId: null,
      status: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    },
    {
      name: "Trang sức",
      slug: "trang-suc",
      parentId: null,
      status: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    },
    {
      name: "Phụ kiện",
      slug: "phu-kien",
      parentId: null,
      status: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    },
    {
      name: "Áo quần nam",
      slug: "ao-quan-nam",
      parentId: 1,
      status: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    },
  ]);
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Categories', null, {});
  }
};
