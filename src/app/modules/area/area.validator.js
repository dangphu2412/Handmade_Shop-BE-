import { checkSchema } from "express-validator";
import CoreValidator from "../../concept/Validator";

class AreaValidator extends CoreValidator {
    checkParamsId() {
        return checkSchema({
            id: this.checkNumber(["params"], "Your id params is not a number"),
        })
    }
}

export default new AreaValidator();
