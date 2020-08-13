import CoreValidator from "../../concept/Validator";

class AreaValidator extends CoreValidator {
    checkParamsId() {
        const objectValditor = {
            id: this.isInt(["params"], "Id"),
        };
        return this.start(objectValditor);
    }
}

export default new AreaValidator();
