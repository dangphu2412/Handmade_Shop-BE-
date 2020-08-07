export default class CreateAddressDto {
    constructor(input) {
        this.userId = input.userId;
        this.districtId = input.districtId;
        this.location = input.location;
        this.phone = input.phone;
    }
}
