import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
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
        as: "details",
        foreignKey: "orderId",
      });
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
    paranoid: true,
    sequelize,
    modelName: "Order",
  });
  return Order;
};
