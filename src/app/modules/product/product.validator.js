import { checkSchema } from "express-validator";
import CoreValidator from "../../concept/Validator";

class ProductValidator extends CoreValidator {
    checkCreateProduct() {
        return checkSchema({
            shopId: this.checkNumber(["body"], "ShopId"),
            categoryId: this.checkNumber(["body"], "CategoryId"),
            name: this.checkExistsOnly(["body"], "Name"),
            description: this.checkExistsOnly(["body"], "Description"),
            price: this.checkNumber(["body"], "Price"),
            amount: this.checkNumber(["body"], "Amount"),
            materialIds: this.checkExistsOnly(["body"], "MaterialIds"),
            gallery: this.checkArray(["body"], "Gallery"),
        });
    }
}

export default new ProductValidator();
