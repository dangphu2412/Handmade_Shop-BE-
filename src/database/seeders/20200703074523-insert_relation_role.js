'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserRoles', [{
      roleId: 1,
      userId: 1,
    },
    {
      roleId: 2,
      userId: 2,
    },
    {
      roleId: 3,
      userId: 3,
    },
    {
      roleId: 1,
      userId: 4,
    }
    ]),
    await queryInterface.bulkInsert('RolePermissions', [{
        roleId: 1,
        permissionId: 1
      },
      {
        roleId: 1,
        permissionId: 2
      },
      {
        roleId: 1,
        permissionId: 3
      },
      {
        roleId: 2,
        permissionId: 4
      },
      {
        roleId: 3,
        permissionId: 5
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.bulkDelete('UserRoles', null, {});
     await queryInterface.bulkDelete('RolePermissions', null, {});
  }
};
