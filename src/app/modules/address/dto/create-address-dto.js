export default class CreateAddressDto {
    constructor(input) {
        this.userId = input.userId;
        this.districtId = input.districtId;
        this.name = input.name;
        this.location = input.location;
        this.phone = input.phone;
    }
}
