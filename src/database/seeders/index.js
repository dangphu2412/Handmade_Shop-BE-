import seedingUser from "./factory/user";
import seedingRoleVsPer from "./factory/roleVsPermission";
import seedingShop from "./factory/shop";
import seedingBank from "./factory/bank";
import seedingCategory from "./factory/category";
import seedingCityAndDistrict from "./factory/cityAndDistrict";
import seedingMaterial from "./factory/material";
import seedingTransport from "./factory/transport";
import seedingProduct from "./factory/product";
import seedingAddress from "./factory/address";
import seedingOrder from "./factory/order";

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
      await seedingShop.start(transaction);
      await seedingProduct.start(transaction);
      await seedingAddress.start(transaction);
      await seedingOrder.start(transaction);

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
