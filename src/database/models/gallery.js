import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Gallery extends Model {
    static associate(models) {
      Gallery.belongsTo(models.Product, {
        as: "product",
        foreignKey: "productId",
      });
    }
  }
  Gallery.init({
    src: DataTypes.STRING,
    kind: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
  }, {
    defaultScope: {
      where: { status: true },
      attributes: ["src", "kind"],
    },
    sequelize,
    modelName: "Gallery",
  });
  return Gallery;
};
