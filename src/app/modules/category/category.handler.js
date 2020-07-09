import CoreHandler from "../../concept/Handler";
import CategoryController from "./category.controller";
import CategoryValidator from "./category.validator";
import AuthenService from "../../../middlewares/Authentication";
import AuthorizeService from "../../../middlewares/Authorization";

class CategoryHandler extends CoreHandler {
    constructor() {
        super(CategoryController, AuthenService, AuthorizeService, CategoryValidator);
    }

    getCategories() {
        return [
            this.validator.checkGetCategories(),
            this.controller.call("getRecursiveCategories"),
        ];
    }
}

export default new CategoryHandler();
