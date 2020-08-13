import slugTransfer from "speakingurl";

export default class CreateShopDto {
  constructor(input) {
      this.name = input.name;
      this.slug = slugTransfer(input.name);
      this.thumbnail = input.thumbnail;
      this.description = input.description;
      this.cardNumber = input.cardNumber;
      this.bankAccount = input.bankAccount;
      this.bankId = input.bankId;
      this.districtId = input.districtId;
      this.userId = input.userId;
  }
}