import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      Address.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
      });
      Address.belongsTo(models.District, {
        as: "district",
        foreignKey: "districtId",
      });
      Address.addScope("getDistrict", (scopes) => {
        return {
          include: [{
            model: models.District.scope(scopes),
            as: "district",
          }],
        };
      });
    }
  }
  Address.init({
    userId: DataTypes.INTEGER,
    districtId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    phone: DataTypes.NUMBER,
  }, {
    timestamps: false,
    sequelize,
    modelName: "Address",
  });
  return Address;
};
