import Sequelize, { Model } from "sequelize";

const { Op } = Sequelize;

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
      Address.addScope("getDistrict", (scopes = ["getCity"]) => ({
          include: [{
            model: models.District.scope(scopes),
            as: "district",
          }],
        }));
    }
  }
  Address.init({
    userId: DataTypes.INTEGER,
    districtId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    phone: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
  }, {
    scopes: {
      validAddresses: {
        attributes: ["id", "name", "location", "phone"],
        where: {
          deletedAt: {
            [Op.eq]: null,
          },
        },
      },
    },
    timestamps: false,
    sequelize,
    modelName: "Address",
  });
  return Address;
};
