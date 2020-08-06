import { checkSchema } from "express-validator";
import CoreValidator from "../../concept/Validator";

class OrderValidator extends CoreValidator {
    checkGetOrders() {
        return checkSchema({
            addressId: this.checkNumber(["body"], "addressId"),
            transportId: this.checkNumber(["body"], "transportId"),
            details: this.checkArray(["body"], "details"),
        });
    }
}

export default new OrderValidator();
