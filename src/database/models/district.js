import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class District extends Model {
    static associate(models) {
      District.belongsTo(models.City, {
        as: "cities",
        foreignKey: "cityId",
      });
      District.hasMany(models.Shop, {
        as: "shops",
        foreignKey: "districtId",
      });
    }
  }
  District.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    cityId: DataTypes.INTEGER,
  }, {
    defaultScope: {
      attributes: ["id", "name", "slug"],
    },
    sequelize,
    modelName: "District",
  });
  return District;
};
