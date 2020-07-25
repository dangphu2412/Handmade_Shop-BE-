import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import ShopService from "./shop.service";

class ShopController extends CoreController {
    constructor() {
        super();
        this.service = ShopService;
    }

    async getOwnerShop(request, response) {
        try {
            const { userId } = this.getCredentialInfo(request);

            const data = await this.service.getOwnerShop(userId);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Get success",
                data,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async fetchOwnerProducts(request, response) {
        try {
            const { query } = request;
            const { userId } = this.getCredentialInfo(request);
            const shop = await this.service.fetchOwnerProducts(query, userId);
            return response.json({
                status: httpStatus.OK,
                data: shop[0].products,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async createShop(request, response) {
        try {
            const payload = request.body;

            const credentials = this.getCredentialInfo(request);

            payload.userId = credentials.userId;

            const data = await this.service.createShop(payload);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Create shop success",
                data,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }
}

export default new ShopController();
