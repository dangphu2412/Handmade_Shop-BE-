export default class CreateOrderDto {
    constructor(input) {
        this.shopId = input.shopId;
        this.userId = input.userId;
        this.addressId = input.addressId;
        this.transportId = input.transportId;
        this.products = input.products;
    }
}
