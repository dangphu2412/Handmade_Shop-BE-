import { checkSchema } from "express-validator";
import CoreValidator from "../../concept/Validator";

class TransportValidator extends CoreValidator {
    checkGetTransports() {
        const customCheckNumberWithMsg = (kind) => {
            const objectValidate = this.checkNumber(["query"], `Your ${kind} is not a number`);
            objectValidate.exists = false;
            return objectValidate;
        };
        return checkSchema({
            page: customCheckNumberWithMsg("page"),
            amount: customCheckNumberWithMsg("amount"),
        });
    }
}

export default new TransportValidator();
