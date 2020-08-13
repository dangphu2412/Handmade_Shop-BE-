import { Models } from "../../models";
import Random from "./random";

const { Address } = Models;

export default class SeedingAddress {
  static async start(transaction) {
    console.log("====== Migrating Shop ==========");
    await SeedingAddress.seedingAddress(transaction);
  }

  static async seedingAddress(transaction) {
      const result = [];
      for (let i = 1; i < 30; i += 1) {
        result.push({
          userId: i + 1,
          districtId: Random.randomNumber(1, 500),
          name: `admin${i + 1}`,
          location: "Trong tim em",
          phone: `09${Random.randomNumber(1, 9)}1200123`,
        });
      }
      return Address.bulkCreate(result, { transaction });
  }
}
