export default class CreateOrderDto {
    constructor(input) {
        this.shopId = input.shopId;
        this.userId = input.userId;
        this.addressId = input.addressId;
        this.transportId = input.transportId;
        this.name = input.name;
        this.totalShip = input.totalShip;
        this.totalBill = input.totalBill;
        this.totalBillAndShip = input.totalBillAndShip;
        this.products = input.products;
    }
}
