import CoreValidator from "../../concept/Validator";

class AddressValidator extends CoreValidator {
    checkCreateAddress() {
        const objectValidator = {
            location: this.isExist(["body"], "location"),
            phone: this.isExist(["body"], "phone"),
            districtId: this.isExist(["body"], "districtId"),
            name: this.isExist(["body"], "name"),
        };

        return this.start(objectValidator);
    }
}

export default new AddressValidator();
