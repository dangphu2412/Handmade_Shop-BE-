import { checkSchema } from "express-validator";
import CoreValidator from "../../concept/Validator";

class AddressValidator extends CoreValidator {
    checkCreateAddress() {
        return checkSchema({
            location: this.checkExistsOnly(["body"], "location"),
            phone: this.checkExistsOnly(["body"], "phone"),
            districtId: this.checkExistsOnly(["body"], "districtId"),
            name: this.checkExistsOnly(["body"], "name"),
        });
    }
}

export default new AddressValidator();
