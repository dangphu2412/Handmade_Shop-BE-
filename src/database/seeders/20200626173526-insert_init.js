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
          roleName: "Admin",
          status: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
        },
        {
          roleName: "Shop keeper",
          status: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
        },
        {
          roleName: "User",
          status: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
        },
      ]);
      await queryInterface.bulkInsert("Users", [{
        username: "dangphu241299@gmail.com",
        name: "Dang Ngoc Phu",
        password: "123123",
        roleId: 1,
        status: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      {
        username: "trambitch123@gmail.com",
        name: "Le Bich Xuan Tram",
        password: "123123",
        roleId: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      {
        username: "haumama@gmail.com",
        name: "Nguyen Tran Hau",
        password: "123123",
        roleId: 3,
        status: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      {
        username: "tramnguyenthi@gmail.com",
        name: "Nguyen Thi Tram",
        password: "123123",
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
