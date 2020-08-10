module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn("Orders", "totalBill", {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      {
        transaction,
      });
      await queryInterface.addColumn("Orders", "totalShip", {
        allowNull: false,
        type: Sequelize.INTEGER,
      }, {
        transaction,
      });
      await queryInterface.addColumn("Orders", "totalBillAndShip", {
        allowNull: false,
        type: Sequelize.INTEGER,
      }, {
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn("Orders", "totalBill", { transaction });
      await queryInterface.removeColumn("Orders", "totalShip", { transaction });
      await queryInterface.removeColumn("Orders", "totalBillAndShip", { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
    }
  },
};
