import seedingUser from "./factory/user";
import seedingRoleVsPer from "./factory/roleVsPermission";
import seedingBank from "./factory/bank";
import seedingCategory from "./factory/category";
import seedingCityAndDistrict from "./factory/cityAndDistrict";
import seedingMaterial from "./factory/material";
import seedingTransport from "./factory/transport";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const roleIds = await seedingRoleVsPer.start(transaction);
      await seedingUser.start(transaction, roleIds);
      await seedingBank.start(transaction);
      await seedingCategory.start(transaction);
      await seedingMaterial.start(transaction);
      await seedingTransport.start(transaction);
      await seedingCityAndDistrict.start(transaction);

      await transaction.commit();
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const roleIds = await seedingRoleVsPer.stop(transaction);
      await seedingUser.stop(transaction, roleIds);
      await seedingBank.stop(transaction);
      await seedingCategory.stop(transaction);
      await seedingMaterial.stop(transaction);
      await seedingTransport.stop(transaction);
      await seedingCityAndDistrict.stop(transaction);

      await transaction.commit();
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw error;
    }
  }
};