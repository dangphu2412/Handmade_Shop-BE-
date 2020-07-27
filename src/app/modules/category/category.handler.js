import CategoryController from "./category.controller";
import CategoryValidator from "./category.validator";
import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";

class CategoryHandler {
    constructor() {
        this.controller = CategoryController;
        this.authen = AuthenService;
        this.authorize = AuthorizeService;
        this.validator = CategoryValidator;
    }

    getCategories() {
        return [
            this.controller.call("getRecursiveCategories"),
        ];
    }
}

export default new CategoryHandler();
