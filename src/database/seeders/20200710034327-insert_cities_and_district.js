export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("Cities", [{
      name: "Đà Nẵng",
      slug: "da-nang",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      name: "Hồ Chí Minh",
      slug: "ho-chi-minh",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      name: "Hà Nội",
      slug: "ha-noi",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      name: "Gia Lai",
      slug: "gia-lai",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      name: "Quảng Trị",
      slug: "quang-tri",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    ]);
    await queryInterface.bulkInsert("Districts", [{
        name: "Thanh Khê",
        slug: "thanh-khe",
        cityId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        name: "Hải Châu",
        slug: "hai-chau",
        cityId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        name: "Hòa Khánh",
        slug: "hoa-khanh",
        cityId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
      name: "Tân Bình",
      slug: "tan-binh",
      cityId: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      },
      {
        name: "Bình Chánh",
        slug: "binh-chanh",
        cityId: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        name: "Bình Thạnh",
        slug: "binh-thanh",
        cityId: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        name: "Đông Hà",
        slug: "dong-ha",
        cityId: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        name: "Triệu Phong",
        slug: "trieu-phong",
        cityId: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        name: "Gio Linh",
        slug: "gio-linh",
        cityId: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
      name: "Ba Đình",
      slug: "ba-dinh",
      cityId: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      },
      {
        name: "Cầu Giấy",
        slug: "cau-giay",
        cityId: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        name: "Hoàn Kiếm",
        slug: "hoang-kiem",
        cityId: 3,
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
