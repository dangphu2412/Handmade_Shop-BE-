import CoreValidator from "../../concept/Validator";

class OrderValidator extends CoreValidator {
    checkPostOrders() {
        const objectValidator = {
            addressId: this.isInt(["body"], "addressId"),
            transportId: this.isInt(["body"], "transportId"),
            details: this.isArray(["body"], "details"),
        };
        return this.start(objectValidator);
    }
}

export default new OrderValidator();
