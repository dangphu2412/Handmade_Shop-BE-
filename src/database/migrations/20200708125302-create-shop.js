"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Shops", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
      },
      districtId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Districts",
          key: "id",
        },
        onUpdate: "CASCADE",
      },
      name: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      slug: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      thumbnail: {
        type: Sequelize.STRING,
        defaultValue: "https://i.ibb.co/9cj28M4/blank-profile-pic.jpg",
      },
      cardNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      bank: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      bankAccount: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Shops");
  },
};