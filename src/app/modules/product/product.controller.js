import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import ProductService from "./product.service";

class ProductController extends CoreController {
    constructor() {
        super();
        this.service = ProductService;
    }

    async fetchProductDetail(request, response) {
        try {
            const { slug } = request.params;

            const data = await this.service.fetchProductDetail(slug);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Get detail succcess",
                data,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async createProduct(request, response) {
        try {
            const payload = request.body;

            const data = await this.service.createProduct(payload);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Create Product success",
                data,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async disableProduct(request, response) {
        try {
            const payload = request.body;

            const data = await this.service.fetchProductDetail(payload);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Create Product success",
                data,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }
}

export default new ProductController();
