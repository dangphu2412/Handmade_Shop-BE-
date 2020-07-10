import { checkSchema } from "express-validator";
import CoreValidator from "../../concept/Validator";

class ProductValidator extends CoreValidator {
    checkCreateProduct() {
        return checkSchema({
            shopId: this.checkNumber(["body"], "Your shopId is empty"),
            categoryId: this.checkNumber(["body"], "Your categoryId is empty"),
            name: this.checkExistsOnly(["body"], "Your name is empty"),
            description: this.checkExistsOnly(["body"], "Your description is empty"),
            price: this.checkNumber(["body"], "Your price is empty"),
            amount: this.checkNumber(["body"], "Your amount is empty"),
            materialId: this.checkExistsOnly(["body"], "Your materialId is empty"),
            transportId: this.checkExistsOnly(["body"], "Your transportId is empty"),
        });
    }
}

export default new ProductValidator();
