import { Role, Permission, Sequelize } from "../models/index";
import { METHOD, MODULE, ROLE } from "../../constants/role";

const { Op } = Sequelize;

export default {
  up: async (queryInterface, Sequelize) => {
    const admin = await Role.findByPk(ROLE.ADMIN.key);
    const creator = await Role.findByPk(ROLE.SHOP_KEEPER.key);
    const user = await Role.findByPk(ROLE.USER.key);

    const userPermissions = await Permission.findAll({
      where: {
        [Op.or]: [
          {
            method: METHOD.GET,
            module: MODULE.PRODUCT,
          },
          {
            method: METHOD.POST,
            module: MODULE.SHOP,
          },
        ],
      },
    });

    const creatorPermissions = await Permission.findAll({
      where: {
        [Op.or]: [
          {
            method: METHOD.POST,
            module: MODULE.PRODUCT,
          },
          {
            method: METHOD.GET,
            module: MODULE.SHOP_KEEPER_PRODUCT,
          },
          {
            method: METHOD.PUT,
            module: MODULE.PRODUCT,
          },
          {
            method: METHOD.DELETE,
            module: MODULE.PRODUCT,
          },
        ],
      },
    });

    const adminPermissions = await Permission.findAll({
      where: {
        [Op.or]: [
          {
            method: METHOD.POST,
            module: MODULE.CATEGORY,
          },
          {
            method: METHOD.POST,
            module: MODULE.CITY,
          },
          {
            method: METHOD.POST,
            module: MODULE.DISTRICT,
          },
          {
            method: METHOD.POST,
            module: MODULE.MATERIAl,
          },
          {
            method: METHOD.POST,
            module: MODULE.PAYMENT,
          },
          {
            method: METHOD.POST,
            module: MODULE.TRANSPORT,
          },
          {
            method: METHOD.PUT,
            module: MODULE.CATEGORY,
          },
          {
            method: METHOD.PUT,
            module: MODULE.CITY,
          },
          {
            method: METHOD.PUT,
            module: MODULE.DISTRICT,
          },
          {
            method: METHOD.PUT,
            module: MODULE.MATERIAl,
          },
          {
            method: METHOD.PUT,
            module: MODULE.PAYMENT,
          },
          {
            method: METHOD.PUT,
            module: MODULE.TRANSPORT,
          },
          {
            method: METHOD.DELETE,
            module: MODULE.CATEGORY,
          },
          {
            method: METHOD.DELETE,
            module: MODULE.CITY,
          },
          {
            method: METHOD.DELETE,
            module: MODULE.DISTRICT,
          },
          {
            method: METHOD.DELETE,
            module: MODULE.MATERIAl,
          },
          {
            method: METHOD.DELETE,
            module: MODULE.PAYMENT,
          },
          {
            method: METHOD.DELETE,
            module: MODULE.TRANSPORT,
          },
        ],
      },
    });

    await creator.addPermissions(creatorPermissions);
    await user.addPermissions(userPermissions);
    await admin.addPermissions(adminPermissions);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
