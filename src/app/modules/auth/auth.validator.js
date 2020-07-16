import { checkSchema } from "express-validator";
import CoreValidator from "../../concept/Validator";

class AuthValidator extends CoreValidator {
    checkSignUpData() {
        return checkSchema({
            username: this.checkEmail(["body"], "Username"),
            name: this.checkExistsOnly(["body"], "Name"),
            password: this.checkWithLength(["body"], "Password", { max: 15, min: 6 }),
        });
    }

    checkSignInData() {
        return checkSchema({
            username: this.checkEmail(["body"], "Username"),
            password: this.checkWithLength(["body"], "Password", { max: 15, min: 6 }),
        });
    }

    checkQueryVerifyToken() {
        return checkSchema({
            token: this.checkExistsOnly(["query"], "Token "),
        });
    }
}

export default new AuthValidator();
