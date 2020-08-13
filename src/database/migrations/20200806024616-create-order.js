module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
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
      shopId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Shops",
          key: "id",
        },
        onUpdate: "CASCADE",
      },
      addressId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Addresses",
          key: "id",
        },
        onUpdate: "CASCADE",
      },
      transportId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Transports",
          key: "id",
        },
        onUpdate: "CASCADE",
      },
      status: {
        defaultValue: "pending confirm",
        type: Sequelize.STRING,
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
        defaultValue: null,
        type: Sequelize.DATE,
      },
      receivedAt: {
        defaultValue: null,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Orders");
  },
};
