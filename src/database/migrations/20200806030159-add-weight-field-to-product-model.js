module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Products", "weight", {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Products", "weight");
  },
};
