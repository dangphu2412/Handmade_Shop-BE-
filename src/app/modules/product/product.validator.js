import { checkSchema } from "express-validator";
import CoreValidator from "../../concept/Validator";

class ProductValidator extends CoreValidator {
    checkSignUpData() {
        return checkSchema({
            username: this.checkEmail(["body"], "Your username is not valid"),
            name: this.checkExistsOnly(["body"], "Your name is missing"),
            password: this.checkWithLength(["body"], "Your password is not valid", { max: 15, min: 10 }),
        });
    }
}

export default new ProductValidator();
