import { checkSchema } from "express-validator";
import CoreValidator from "../../concept/Validator";

class ShopValidator extends CoreValidator {
    checkCreateShop() {
        return checkSchema({
            name: this.checkWithLength(["body"], "name ", { max: 20, min: 1 }),
            description: this.checkExistsOnly(["body"], "description "),
            thumbnail: this.checkExistsOnly(["body"], "thumbnail "),
            cardNumber: this.checkExistsOnly(["body"], "cardNumber "),
            bankAccount: this.checkExistsOnly(["body"], "bankAccount "),
            bankId: this.checkNumber(["body"], "bankId "),
            districtId: this.checkNumber(["body"], "districtId"),
            transportIds: this.checkArray(["body"], "TransportIds"),
        });
    }
}

export default new ShopValidator();
