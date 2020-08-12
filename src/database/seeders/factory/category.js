import { Models } from "../../models";

const { Category } = Models;

export default class SeedCategory {
  static categorySeeding() {
    return [
      {
        name: "Áo quần",
        slug: "ao-quan",
        parentId: null,
      },
      {
        name: "Giày dép",
        slug: "giay-dep",
        parentId: null,
      },
      {
        name: "Trang sức",
        slug: "trang-suc",
        parentId: null,
      },
      {
        name: "Phụ kiện",
        slug: "phu-kien",
        parentId: null,
      },
      {
        name: "Áo quần nam",
        slug: "ao-quan-nam",
        parentId: 1,
      },
      {
        name: "Áo quần nữ",
        slug: "ao-quan-nu",
        parentId: 1,
      },
      {
        name: "Giày custom",
        slug: "giay-custom",
        parentId: 2,
      },
      {
        name: "Dép custom",
        slug: "dep-custom",
        parentId: 2,
      },
      {
        name: "Vòng cổ",
        slug: "vong-co",
        parentId: 3,
      },
      {
        name: "Lắc tay",
        slug: "lac-tay",
        parentId: 3,
      },
      {
        name: "Xương thú",
        slug: "xuong-thu",
        parentId: 3,
      },
      {
        name: "Nhẫn",
        slug: "nhan",
        parentId: 3,
      },
      {
        name: "Túi",
        slug: "tui",
        parentId: 4,
      },
      {
        name: "Nhãn dán",
        slug: "nhan-dan",
        parentId: 4,
      },
      {
        name: "Tự thiết kế",
        slug: "tu-thiet-ke",
        parentId: 4,
      },
    ];
  }

  static start(transaction) {
    console.log("====== Migrating Category ==========");
    return Category.bulkCreate(SeedCategory.categorySeeding(), { transaction });
  }
}
