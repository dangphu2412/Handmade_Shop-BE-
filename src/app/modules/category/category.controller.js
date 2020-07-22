import httpStatus from "http-status";

import CoreController from "../../concept/Controller";
import CategoryService from "./category.service";

class CategoryController extends CoreController {
    constructor() {
        super();
        this.service = CategoryService;
    }

    async getRecursiveCategories(request, response) {
        try {
            const attributes = ["id", "parentId", "name", "slug"];
            const data = await this.service.getRecursive("children", attributes);
            return response.json({
                status: httpStatus.OK,
                data,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }
}

export default new CategoryController();
