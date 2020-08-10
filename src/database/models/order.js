import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Shop, {
        as: "shop",
        foreignKey: "shopId",
      });
      Order.belongsTo(models.Address, {
        as: "address",
        foreignKey: "addressId",
      });
      Order.belongsTo(models.Transport, {
        as: "transport",
        foreignKey: "transportId",
      });
      Order.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
      });
      Order.hasMany(models.OrderDetail, {
        as: "products",
        foreignKey: "orderId",
      });
      // Scopes
      Order.addScope("getOrderDetail", (scopes = ["overview", "getProductOverview"]) => ({
          include: [{
            model: models.OrderDetail.scope(scopes),
            as: "products",
            foreignKey: "orderId",
          }],
      }));
      Order.addScope("getShop", (scopes = "getInfo") => ({
        include: [{
          model: models.Shop.scope(scopes),
          as: "shop",
          foreignKey: "shopId",
        }],
      }));
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    shopId: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER,
    transportId: DataTypes.INTEGER,
    totalShip: DataTypes.INTEGER,
    totalBill: DataTypes.INTEGER,
    totalBillAndShip: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    receivedAt: DataTypes.DATE,
  }, {
    scopes: {
      overview: {
        attributes: ["id", "totalBillAndShip", "createdAt", "updatedAt"],
      },
    },
    paranoid: true,
    sequelize,
    modelName: "Order",
  });
  return Order;
};
