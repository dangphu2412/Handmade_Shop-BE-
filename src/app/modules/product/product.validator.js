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
            materialId: this.checkExistsOnly(["body"], "MaterialId"),
            transportId: this.checkExistsOnly(["body"], "TransportId"),
        });
    }
}

export default new ProductValidator();
