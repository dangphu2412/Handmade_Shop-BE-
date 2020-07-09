module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ProductTransports", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ProductTransports");
  },
};
