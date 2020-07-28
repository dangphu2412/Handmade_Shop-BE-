import httpStatus from "http-status";

import CoreController from "../../concept/Controller";
import CategoryService from "./category.service";

class CategoryController extends CoreController {
    constructor() {
        super();
        this.service = CategoryService;
    }

    async getAllCategories(request, response) {
        try {
            const { query } = request;
            const data = await this.service.getTreeCategories(query);
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
