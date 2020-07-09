"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("RolePermissions", [{
        roleId: 1,
        permissionId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      {
        roleId: 1,
        permissionId: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      {
        roleId: 1,
        permissionId: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      {
        roleId: 2,
        permissionId: 4,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
      {
        roleId: 3,
        permissionId: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete("RolePermissions", null, {});
  },
};
