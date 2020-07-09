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
            const categories = await this.service.getRecursive("categories", attributes);
            return response.json({
                status: httpStatus.OK,
                results: categories,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }
}

export default new CategoryController();
