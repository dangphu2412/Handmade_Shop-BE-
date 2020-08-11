import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import ProductService from "./product.service";

class ProductController extends CoreController {
    constructor() {
        super();
        this.service = ProductService;
    }

    async fetchProducts(request, response) {
        try {
            const { query } = request;

            const data = await this.service.fetchProducts(query);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Get detail succcess",
                data,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
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

    async fetchProductDetailById(request, response) {
        try {
            const { id } = request.params;
            const { userId } = this.getCredentialInfo(request);
            const data = await this.service.fetchProductDetailById(id, userId);

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

    async updateProduct(request, response) {
        try {
            const payload = request.body;
            const { id } = request.params;
            payload.id = id;
            await this.service.updateProduct(payload);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Update Product success",
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async disableProduct(request, response) {
        try {
            const { id: idProduct } = request.params;
            const { userId } = this.getCredentialInfo(request);

            await this.service.disableProduct(idProduct, userId);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Disable product success",
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }
}

export default new ProductController();
