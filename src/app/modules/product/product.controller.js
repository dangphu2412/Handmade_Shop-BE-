import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import AuthService from "./product.service";

class ProductController extends CoreController {
    constructor() {
        super();
        this.service = AuthService;
    }

    async createProduct(request, response) {
        try {
            const payload = request.body;

            await this.service.createProduct(payload);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Create Product success",
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }
}

export default new ProductController();
