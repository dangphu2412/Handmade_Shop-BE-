import { Models, Sequelize } from "../models/index";
import { METHOD, MODULE, ROLE } from "../../constants/role";

const { Op } = Sequelize;
const { Role, Permission } = Models;

export default {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface) => {
      const creator = await Role.findByPk(ROLE.SHOP_KEEPER.key);
      const user = await Role.findByPk(ROLE.USER.key);

      const userPermissions = await Permission.findAll({
        where: {
          [Op.or]: [
            {
              method: METHOD.POST,
              module: MODULE.ORDER,
            },
          ],
        },
      });

      const creatorPermissions = await Permission.findAll({
        where: {
          [Op.or]: [
            {
              method: METHOD.GET,
              module: MODULE.ORDER,
            },
            {
              method: METHOD.GET,
              module: MODULE.ORDER_DETAIL,
            },
            {
              method: METHOD.PUT,
              module: MODULE.ORDER,
            },
            {
              method: METHOD.PUT,
              module: MODULE.ORDER_DETAIL,
            },
            {
              method: METHOD.DELETE,
              module: MODULE.ORDER,
            },
            {
              method: METHOD.DELETE,
              module: MODULE.ORDER_DETAIL,
            },
          ],
        },
      });
      await creator.addPermissions(creatorPermissions);
      await user.addPermissions(userPermissions);
  },

  down: async () => {
  },
};
