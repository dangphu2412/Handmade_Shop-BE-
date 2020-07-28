import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Material extends Model {
    static associate(models) {
      Material.belongsToMany(models.Product, {
        as: "products",
        through: "ProductMaterials",
        foreignKey: "materialId",
        otherKey: "productId",
        timestamps: false,
      });
    }
  }
  Material.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {
    defaultScope: {
      attributes: ["id", "name", "slug"],
      where: { status: true },
    },
    sequelize,
    modelName: "Material",
  });
  return Material;
};
