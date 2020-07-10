"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      name: {
        type: Sequelize.STRING(50),
      },
      slug: {
        type: Sequelize.STRING(50),
      },
      password: {
        type: Sequelize.STRING(100),
      },
      avatar: {
        type: Sequelize.STRING,
        defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfTK0N0iseFntGW7CWT4e0qcpE7eqj2ZBKIw&usqp=CAU",
      },
      status: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      roleId: {
        defaultValue: 3,
        type: Sequelize.INTEGER,
        references: {
          model: "Roles",
          key: "id",
        },
        onUpdate: "CASCADE",
      },
      shopActive: {
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.dropTable("Users");
  },
};
