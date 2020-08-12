import { Models } from "../../models";

const { Bank } = Models;

export default class SeedingBank {
  static start(transaction) {
    console.log("====== Migrating Bank ==========");
    return Bank.bulkCreate(SeedingBank.seedingBank(), { transaction });
  }

  static seedingBank() {
    return [
      {
        name: "SBTC",
        slug: "sbtc",
      },
      {
        name: "Đông Á",
        slug: "dong-a",
      },
      {
        name: "Vietcombank",
        slug: "vietcombank",
      },
      {
        name: "Techcombank",
        slug: "techcombank",
      },
      {
        name: "Quân đội",
        slug: "quan-doi",
      },
    ];
  }
}
