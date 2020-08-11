export default class CreateShopDto {
  constructor(input) {
      this.id = input.id;
      this.name = input.name;
      this.shopId = input.shopId;
      this.categoryId = input.categoryId;
      this.description = input.description;
      this.price = input.price;
      this.amount = input.amount;
      this.restAmount = input.amount;
      this.districtId = input.districtId;
      this.thumbnail = this.getThumbnail(input.gallery);
  }

  getThumbnail(gallery) {
    const thumbnail = gallery.find((item) => (item.status));
    return thumbnail.src;
  }
}
