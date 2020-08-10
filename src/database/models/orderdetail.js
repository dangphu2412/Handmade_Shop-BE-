import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      OrderDetail.belongsTo(models.Order, {
        as: "order",
        foreignKey: "orderId",
      });
      OrderDetail.belongsTo(models.Product, {
        as: "product",
        foreignKey: "productId",
      });
      OrderDetail.addScope("getProductOverview", (scopes = "withThumbnail") => ({
        include: [{
          model: models.Product.scope(scopes),
          as: "product",
          foreignKey: "productId",
        }],
      }));
    }
  }
  OrderDetail.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
  }, {
    scopes: {
      overview: {
        attributes: ["id", "name", "cost", "amount"],
        where: {
          status: true,
        },
      },
    },
    paranoid: true,
    sequelize,
    modelName: "OrderDetail",
  });
  return OrderDetail;
};
