import { checkSchema } from "express-validator";
import CoreValidator from "../../concept/Validator";

class AddressValidator extends CoreValidator {
    checkCreateAddress() {
        return checkSchema({
            location: this.checkExistsOnly(["body"], "location"),
            phone: this.checkExistsOnly(["body"], "phone"),
        });
    }
}

export default new AddressValidator();
