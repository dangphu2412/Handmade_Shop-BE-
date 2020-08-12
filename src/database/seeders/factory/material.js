import { Models } from "../../models";

const { Material } = Models;

export default class SeedingMaterial {
  static start(transaction) {
    console.log("====== Migrating Material ==========");
    return Material.bulkCreate(SeedingMaterial.seedingMaterial(), { transaction });
  }

  static seedingMaterial() {
    return [
      {
        name: "Xương",
        slug: "xuong",
      },
      {
        name: "Vãi",
        slug: "vai",
      },
      {
        name: "Cotton",
        slug: "cotton",
      },
      {
        name: "Da",
        slug: "da",
      },
      {
        name: "Giấy",
        slug: "giay",
      },
      {
        name: "Gỗ",
        slug: "go",
      },
    ];
  }
}