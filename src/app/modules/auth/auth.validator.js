import { checkSchema } from "express-validator";
import CoreValidator from "../../concept/Validator";

class AuthValidator extends CoreValidator {
    checkSignUpData() {
        return checkSchema({
            username: this.checkEmail(["body"], "Your username is not valid"),
            name: this.checkExistsOnly(["body"], "Your name is missing"),
            password: this.checkWithLength(["body"], "Your password is not valid", { max: 15, min: 10 }),
        });
    }

    checkSignInData() {
        return checkSchema({
            username: this.checkEmail(["body"], "Your username is not valid"),
            password: this.checkWithLength(["body"], "Your password is not valid", { max: 15, min: 10 }),
        });
    }

    checkQueryVerifyToken() {
        return checkSchema({
            token: this.checkExistsOnly(["query"], "Your token is not exist"),
        });
    }
}

export default new AuthValidator();
