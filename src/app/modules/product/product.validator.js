import CoreValidator from "../../concept/Validator";

class ProductValidator extends CoreValidator {
    checkCreateProduct() {
        const objectValidator = {
            shopId: this.isInt(["body"], "ShopId"),
            categoryId: this.isInt(["body"], "CategoryId"),
            name: this.isExist(["body"], "Name"),
            description: this.isExist(["body"], "Description"),
            price: this.isInt(["body"], "Price"),
            restAmount: this.isInt(["body"], "restAmount"),
            reduce: this.isInt(["body"], "reduce"),
            percent: this.isInt(["body"], "percent"),
            materialIds: this.isExist(["body"], "MaterialIds"),
            gallery: this.isArray(["body"], "Gallery"),
        };

        return this.start(objectValidator);
    }
}

export default new ProductValidator();
