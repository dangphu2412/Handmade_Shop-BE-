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
    {
      name: "Áo quần nữ",
      slug: "ao-quan-nu",
      parentId: 1,
      status: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    },
    {
      name: "Giày custom",
      slug: "giay-custom",
      parentId: 2,
      status: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    },
    {
      name: "Dép custom",
      slug: "dep-custom",
      parentId: 2,
      status: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    },
    {
      name: "Vòng cổ",
      slug: "vong-co",
      parentId: 3,
      status: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    },
    {
      name: "Lắc tay",
      slug: "lac-tay",
      parentId: 3,
      status: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    },
    {
      name: "Túi",
      slug: "tui",
      parentId: 4,
      status: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    },
    {
      name: "Nhãn dán",
      slug: "nhan-dan",
      parentId: 4,
      status: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    },
    {
      name: "Tự thiết kế",
      slug: "tu-thiet-ke",
      parentId: 4,
      status: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    },
  ]);
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete("Categories", null, {});
  },
};
