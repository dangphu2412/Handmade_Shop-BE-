export default class UpdateProductDto {
  constructor(input) {
      this.id = input.id;
      this.name = input.name;
      this.categoryId = input.categoryId;
      this.description = input.description;
      this.price = input.price;
      this.reduce = input.reduce;
      this.percent = input.percent;
      this.restAmount = input.restAmount;
      this.weight = input.weight;
      this.districtId = input.districtId;
      this.thumbnail = this.getThumbnail(input.gallery);
  }

  getThumbnail(gallery) {
    const thumbnail = gallery.find((item) => (item.status));
    return thumbnail.src;
  }
}
