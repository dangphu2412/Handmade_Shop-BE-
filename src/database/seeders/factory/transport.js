import { Models } from "../../models";

const { Transport } = Models;

export default class SeedingTransport {
  static start(transaction) {
        console.log("====== Migrating Transport ==========");
    return Transport.bulkCreate(SeedingTransport.transportSeeding(), { transaction });
  }

  static transportSeeding() {
    return [
      {
        brand: "Grab",
        slug: "grab",
        fee: 0.15,
     },
     {
        brand: "Bee",
        slug: "bee",
        fee: 0.15,
      },
      {
        brand: "VnExpress",
        slug: "vnexpress",
        fee: 0.15,
     },
      {
        brand: "GiaoHangNhanh",
        slug: "giaohangnhanh",
        fee: 0.15,
      },
    ];
  }
}
