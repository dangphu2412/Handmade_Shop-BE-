module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ShopTransports", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      shopId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Shops",
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
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("ShopTransports");
  },
};
