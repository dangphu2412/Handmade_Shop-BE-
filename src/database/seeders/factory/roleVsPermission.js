import Sequelize from "sequelize";
import { Models } from "../../models";
import { METHOD, MODULE, ROLE } from "../../../constants/role";

const { Op } = Sequelize;
const { Role, Permission } = Models;

export default class SeedRoleAndPermission {
  static async start(transaction) {
    await SeedRoleAndPermission.createRole(transaction);
    await SeedRoleAndPermission.createPermissions(transaction);
    return SeedRoleAndPermission.setRoleVsPermissions(transaction);
  }

  static createPermissions(transaction) {
    return Permission.bulkCreate(
    [{
        method: "GET",
        module: "USER",
        description: "Admin read all users",
      },
      {
        method: "GET",
        module: "CITY",
        description: "Get all cities",
      },
      {
        method: "GET",
        module: "DISTRICT",
        description: "Get all districts",
      },
      {
        method: "GET",
        module: "CATEGORY",
        description: "Get all categories",

      },
      {
        method: "GET",
        module: "MATERIAL",
        description: "Get all materials",

      },
      {
        method: "GET",
        module: "PAYMENT",
        description: "Get all payment",

      },
      {
        method: "GET",
        module: "TRANSPORT",
        description: "Get all transports",

      },
      {
        method: "GET",
        module: "PRODUCT",
        description: "Get all products",

      },
      {
        method: "GET",
        module: "SHOP",
        description: "Get all products",

      },
      {
        method: "GET",
        module: "USER/PRODUCT",
        description: "Admin view all user 's product'",

      },
      {
        method: "GET",
        module: "USER/SHOP",
        description: "Admin view all shop'",
      },
      {
        method: "GET",
        module: "ORDER",
        description: "Admin view all shop'",
      },
      {
        method: "GET",
        module: "ORDER/DETAIL",
        description: "Admin view all shop'",
      },
      {
        method: "POST",
        module: "USER",
        description: "Admin read all users",

      },
      {
        method: "POST",
        module: "CITY",
        description: "Get all cities",

      },
      {
        method: "POST",
        module: "DISTRICT",
        description: "Get all districts",

      },
      {
        method: "POST",
        module: "CATEGORY",
        description: "Get all categories",

      },
      {
        method: "POST",
        module: "MATERIAL",
        description: "Get all materials",

      },
      {
        method: "POST",
        module: "PAYMENT",
        description: "Get all payment",

      },
      {
        method: "POST",
        module: "TRANSPORT",
        description: "Get all transports",

      },
      {
        method: "POST",
        module: "PRODUCT",
        description: "Post product",

      },
      {
        method: "POST",
        module: "SHOP",
        description: "Post shop",

      },
      {
        method: "POST",
        module: "USER/PRODUCT",
        description: "Admin view all user 's product'",

      },
      {
        method: "POST",
        module: "USER/SHOP",
        description: "Admin update all shop'",
      },
      {
        method: "POST",
        module: "ORDER",
        description: "Shopkeeper create order'",
      },
      {
        method: "PUT",
        module: "USER",
        description: "Admin read all users",
      },
      {
        method: "PUT",
        module: "CITY",
        description: "Update all cities",

      },
      {
        method: "PUT",
        module: "DISTRICT",
        description: "Update all districts",

      },
      {
        method: "PUT",
        module: "CATEGORY",
        description: "Update all category",

      },
      {
        method: "PUT",
        module: "MATERIAL",
        description: "Update material",

      },
      {
        method: "PUT",
        module: "PAYMENT",
        description: "Get all payment",

      },
      {
        method: "PUT",
        module: "TRANSPORT",
        description: "Update all transport",

      },
      {
        method: "PUT",
        module: "PRODUCT",
        description: "Update product",

      },
      {
        method: "PUT",
        module: "SHOP",
        description: "Update all shop",

      },
      {
        method: "PUT",
        module: "USER/PRODUCT",
        description: "Admin view all user 's product'",

      },
      {
        method: "PUT",
        module: "USER/SHOP",
        description: "Admin view all shop'",
      },
      {
        method: "PUT",
        module: "ORDER",
        description: "Shopkeeper update order",
      },
      {
        method: "PUT",
        module: "ORDER/DETAIL",
        description: "Shopkeeper update order",
      },
      {
        method: "DELETE",
        module: "USER",
        description: "Admin read all users",

      },
      {
        method: "DELETE",
        module: "CITY",
        description: "Get all cities",

      },
      {
        method: "DELETE",
        module: "DISTRICT",
        description: "Get all districts",

      },
      {
        method: "DELETE",
        module: "CATEGORY",
        description: "Get all categories",

      },
      {
        method: "DELETE",
        module: "MATERIAL",
        description: "Get all materials",

      },
      {
        method: "DELETE",
        module: "PAYMENT",
        description: "Get all payment",

      },
      {
        method: "DELETE",
        module: "TRANSPORT",
        description: "Get all transports",

      },
      {
        method: "DELETE",
        module: "PRODUCT",
        description: "Delete product",

      },
      {
        method: "DELETE",
        module: "SHOP",
        description: "Delete shop",

      },
      {
        method: "DELETE",
        module: "USER/PRODUCT",
        description: "Admin delete user 's product'",

      },
      {
        method: "DELETE",
        module: "USER/SHOP",
        description: "Admin delete shop'",
      },
      {
        method: "DELETE",
        module: "ORDER",
        description: "Admin delete shop'",
      },
      {
        method: "DELETE",
        module: "ORDER/DETAIL",
        description: "Admin delete shop'",
      },
    ],
    { transaction },
    );
  }

  static createRole(transaction) {
    const data = [
      {
        rolename: "Admin",
      },
      {
        rolename: "Shop keeper",
      },
      {
        rolename: "User",
      },
    ];
    return Role.bulkCreate(data, { transaction });
  }

  static async setRoleVsPermissions(transaction) {
    const admin = await Role.findOne({
      where: {
        rolename: ROLE.ADMIN,
      },
      transaction,
    });
    const creator = await Role.findOne({
      where: {
        rolename: ROLE.SHOP_KEEPER,
      },
      transaction,
    });
    const user = await Role.findOne({
      where: {
        rolename: ROLE.USER,
      },
      transaction,
     });
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
          {
            method: METHOD.POST,
            module: MODULE.ORDER,
          },
          {
            method: METHOD.PUT,
            module: MODULE.ORDER,
          },
        ],
      },
      transaction,
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
      transaction,
    });

    const adminPermissions = await Permission.findAll({
      where: {
        [Op.or]: [
          {
            method: METHOD.GET,
            module: MODULE.USER,
          },
          {
            method: METHOD.GET,
            module: MODULE.SHOP,
          },
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
            module: MODULE.SHOP,
          },
          {
            method: METHOD.PUT,
            module: MODULE.USER,
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
      transaction,
    });
    await creator.addPermissions(creatorPermissions, { transaction });
    await user.addPermissions(userPermissions, { transaction });
    await admin.addPermissions(adminPermissions, { transaction });
    return {
      adminId: admin.id,
      shopkeeperId: creator.id,
      userId: user.id,
    };
  }
}
