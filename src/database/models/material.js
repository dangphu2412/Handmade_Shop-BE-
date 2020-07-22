const {
  Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    static associate(models) {
      Material.belongsToMany(models.Product, {
        as: "products",
        through: models.ProductMaterial,
        foreignKey: "materialId",
        otherKey: "productId",
      });
    }
  }
  Material.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: "Material",
  });
  return Material;
};
