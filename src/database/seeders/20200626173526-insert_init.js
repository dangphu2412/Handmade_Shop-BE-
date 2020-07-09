"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert("Permissions", [{
        method: "GET",
        module: "USER",
        description: "Admin read all users",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      {
        method: "PUT",
        module: "USER",
        description: "Admin edit all users",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      {
        method: "GET",
        module: "USER/PRODUCT",
        description: "Admin view all user 's product'",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      {
        method: "POST",
        module: "PRODUCT", // Must be a shop keeper
        description: "Shop keeper create new product",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      {
        method: "POST",
        module: "SHOP", // Must be a user
        description: "User create new shop",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      ]);
      await queryInterface.bulkInsert("Roles", [{
          rolename: "Admin",
          status: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
        },
        {
          rolename: "Shop keeper",
          status: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
        },
        {
          rolename: "User",
          status: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
        },
      ]);
      await queryInterface.bulkInsert("Users", [{
        username: "dangphu241299@gmail.com",
        name: "Dang Ngoc Phu",
        slug: "dang-ngoc-phu",
        password: "$2y$10$OSVoQgSfVfQoWYm9/nbnG.cKEMjWnUALWrwvrMABhV4ZGw8GV/YgO",
        roleId: 1,
        status: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      {
        username: "trambitch123@gmail.com",
        name: "Le Bich Xuan Tram",
        slug: "le-bich-xuan-tram",
        password: "$2y$10$OSVoQgSfVfQoWYm9/nbnG.cKEMjWnUALWrwvrMABhV4ZGw8GV/YgO",
        roleId: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      {
        username: "haumama@gmail.com",
        name: "Nguyen Tran Hau",
        slug: "nguyen-tran-hau",
        password: "$2y$10$OSVoQgSfVfQoWYm9/nbnG.cKEMjWnUALWrwvrMABhV4ZGw8GV/YgO",
        roleId: 3,
        status: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      {
        username: "tramnguyenthi@gmail.com",
        name: "Nguyen Thi Tram",
        slug: "nguyen-thi-tram",
        password: "$2y$10$OSVoQgSfVfQoWYm9/nbnG.cKEMjWnUALWrwvrMABhV4ZGw8GV/YgO",
        roleId: 1,
        status: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Permissions", null, {});
    await queryInterface.bulkDelete("Roles", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
