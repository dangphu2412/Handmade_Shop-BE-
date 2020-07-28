import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      City.hasMany(models.District, {
        as: "districts",
        foreignKey: "cityId",
      });
    }
  }
  City.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
  }, {
    defaultScope: {
      attributes: ["id", "name", "slug"],
    },
    sequelize,
    modelName: "City",
  });
  return City;
};
