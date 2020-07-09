const {
  Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Gallery extends Model {
    static associate(models) {
      Gallery.belongsTo(models.Product, {
        as: "products",
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
    sequelize,
    modelName: "Gallery",
  });
  return Gallery;
};
