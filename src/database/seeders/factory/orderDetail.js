import { Models } from "../../models";
import Random from "./random";

const { OrderDetail } = Models;

export default class SeedingOrderDetail {
  static async start(transaction) {
    console.log("====== Migrating Order Detail==========");
    await SeedingOrderDetail.seedingOrderDetail(transaction);
  }

  static async seedingOrderDetail(transaction) {
      const result = [];
      for (let i = 1; i < 30; i += 1) {
        for (let j = 0; j < 100; j += 1) {
          const cost = Random.randomNumber(50000, 100000);
          result.push({
            orderId: Random.randomNumber(1, 850),
            productId: Random.randomNumber(1, 300),
            amount: Random.randomNumber(1, 5),
            weight: Random.randomNumber(20, 50),
            cost,
          });
        }
      }
      return OrderDetail.bulkCreate(result, { transaction });
  }
}
