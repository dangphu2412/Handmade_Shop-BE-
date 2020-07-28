import { checkSchema } from "express-validator";
import CoreValidator from "../../concept/Validator";

class PaymentValidator extends CoreValidator {
    checkGetCategories() {
        const customCheckNumberWithMsg = (kind) => this.checkNumber(["query"], `Your ${kind} is not a number`);
        return checkSchema({
            page: customCheckNumberWithMsg("page"),
            amount: customCheckNumberWithMsg("amount"),
        });
    }
}

export default new PaymentValidator();
