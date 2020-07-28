import { checkSchema } from "express-validator";
import CoreValidator from "../../concept/Validator";

class AreaValidator extends CoreValidator {
    checkParamsId() {
        return checkSchema({
            id: this.checkNumber(["params"], "Id"),
        });
    }
}

export default new AreaValidator();
