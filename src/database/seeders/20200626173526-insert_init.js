'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Users', [{
          username: 'Dang Ngoc Phu',
          password: '123123',
          status: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          username: 'Le Bich Xuan Tram',
          password: '123123',
          status: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          username: 'Nguyen Tran Hau',
          password: '123123',
          status: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          username: 'Nguyen Thi Tram',
          password: '123123',
          status: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]);
      await queryInterface.bulkInsert('Permissions', [{
        code: 'RaU', // Read all users
        description: "Admin read all users"
      },
      {
        code: 'EaU', // Edit all users
        description: "Admin edit all users"
      },
      {
        code: 'VuP', // View user product
        description: "Admin view all user \'s product'"
      },
      {
        code: 'CnP', // Must be a shop keeper
        description: "Shop keeper create new product"
      },
      {
        code: 'CnS', // Must be a user
        description: "User create new shop"
      }
      ]);
      await queryInterface.bulkInsert('Roles', [{
          roleName: "Admin",
          status: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deleteddAt: new Date().toISOString()
        },
        {
          roleName: "Shop keeper",
          status: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deleteddAt: new Date().toISOString()
        },
        {
          roleName: "User",
          status: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deleteddAt: new Date().toISOString()
        },
      ]);
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Users', null, {});
    
    await queryInterface.bulkDelete('Permissions', null, {});
    
    await queryInterface.bulkDelete('Roles', null, {});
     
  }
};