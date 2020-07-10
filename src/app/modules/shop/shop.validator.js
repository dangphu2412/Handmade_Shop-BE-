import { checkSchema } from "express-validator";
import CoreValidator from "../../concept/Validator";

class ShopValidator extends CoreValidator {
    checkCreateShop() {
        return checkSchema({
            name: this.checkWithLength(["body"], "Your shop name is not valid", { max: 20, min: 1 }),
            description: this.checkExistsOnly(["body"], "Your description is missing"),
            thumbnail: this.checkExistsOnly(["body"], "Your thumbnail is missing"),
            cardNumber: this.checkExistsOnly(["body"], "Your cardNumber is missing"),
            bank: this.checkExistsOnly(["body"], "Your bank is missing"),
            bankAccount: this.checkExistsOnly(["body"], "Your bankAccount is missing"),
            districtId: this.checkNumber(["body"], "Your districtId is not valid, must be a number"),
            
        });
    }
}

export default new ShopValidator();
