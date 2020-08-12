import slugTransfer from "speakingurl";

export default class CreateProductDto {
  constructor(input) {
      this.name = input.name;
      this.slug = slugTransfer(input.name + Date.now());
      this.shopId = input.shopId;
      this.categoryId = input.categoryId;
      this.description = input.description;
      this.price = input.price;
      this.reduce = input.reduce;
      this.percent = input.percent;
      this.amount = input.amount;
      this.restAmount = input.amount;
      this.weight = input.weight;
      this.districtId = input.districtId;
      this.thumbnail = input.gallery[0].src;
      this.gallery = input.gallery;
  }
}
