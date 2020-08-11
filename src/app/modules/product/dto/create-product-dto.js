import slugTransfer from "speakingurl";

export default class CreateShopDto {
  constructor(input) {
      this.name = input.name;
      this.slug = slugTransfer(input.name + Date.now());
      this.shopId = input.shopId;
      this.categoryId = input.categoryId;
      this.description = input.description;
      this.price = input.price;
      this.amount = input.amount;
      this.restAmount = input.amount;
      this.districtId = input.districtId;
      this.thumbnail = input.gallery[0].src;
      this.gallery = input.gallery;
  }
}
