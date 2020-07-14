import { checkSchema } from "express-validator";
import CoreValidator from "../../concept/Validator";

class ShopValidator extends CoreValidator {
    checkCreateShop() {
        return checkSchema({
            name: this.checkWithLength(["body"], "Name ", { max: 20, min: 1 }),
            description: this.checkExistsOnly(["body"], "Description "),
            thumbnail: this.checkExistsOnly(["body"], "Thumbnail "),
            cardNumber: this.checkExistsOnly(["body"], "CardNumber "),
            bankAccount: this.checkExistsOnly(["body"], "BankAccount "),
            bankId: this.checkNumber(["body"], "BankId "),
            districtId: this.checkNumber(["body"], "DistrictIdr"),
        });
    }
}

export default new ShopValidator();
