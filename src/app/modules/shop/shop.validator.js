import { checkSchema } from "express-validator";
import CoreValidator from "../../concept/Validator";

class ShopValidator extends CoreValidator {
    checkCreateShop() {
        const objectValidator = {
            name: this.matchLength(["body"], "name ", { max: 20, min: 1 }),
            description: this.isExist(["body"], "description "),
            thumbnail: this.isExist(["body"], "thumbnail "),
            cardNumber: this.isExist(["body"], "cardNumber "),
            bankAccount: this.isExist(["body"], "bankAccount "),
            bankId: this.isInt(["body"], "bankId "),
            districtId: this.isInt(["body"], "districtId"),
            transportIds: this.isArray(["body"], "TransportIds"),
        };
        return this.start(objectValidator);
    }
}

export default new ShopValidator();
