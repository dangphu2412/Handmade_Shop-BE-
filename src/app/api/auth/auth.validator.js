import { checkSchema } from "express-validator";
import CoreValidator from "../../concept/Validator";

class AuthValidator extends CoreValidator {
    checkSignUpData() {
        const objectValidator = {
            username: this.isEmail(["body"], "Username"),
            name: this.isExist(["body"], "Name"),
            password: this.matchLength(["body"], "Password", { max: 15, min: 6 }),
        };
        return this.start(objectValidator);
    }

    checkSignInData() {
        const objectValidator = {
            username: this.isEmail(["body"], "Username"),
            password: this.matchLength(["body"], "Password", { max: 15, min: 6 }),
        };
        return this.start(objectValidator);
    }

    checkQueryVerifyToken() {
        const objectValidator = {
            token: this.isExist(["query"], "Token "),
        };
        return this.start(objectValidator);
    }
}

export default new AuthValidator();
