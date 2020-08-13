export default class CreateOrderDto {
    constructor(input) {
        this.orderId = input.orderId;
        this.productId = input.productId;
        this.amount = input.amount;
        this.weight = input.weight;
        this.cost = input.cost;
    }
}
