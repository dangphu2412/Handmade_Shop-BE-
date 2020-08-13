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
      this.restAmount = input.restAmount;
      this.sold = 0;
      this.weight = input.weight;
      this.districtId = input.districtId;
      this.thumbnail = input.gallery[0].src;
      this.gallery = input.gallery;
  }
}
