export default class CreateAddressDto {
    constructor(input) {
        this.userId = input.userId;
        this.location = input.location;
        this.phone = input.phone;
    }
}
