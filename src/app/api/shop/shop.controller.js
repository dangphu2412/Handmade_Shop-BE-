import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import ShopService from "./shop.service";
import PatchStatusDto from "./dto/patch-status.dto.js";

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
            const data = await this.service.fetchOwnerProducts(query, userId);
            return response.json({
                status: httpStatus.OK,
                data,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async fetchProductsByShopSlug(request, response) {
        try {
            const { params, query } = request;
            const { slug } = params;
            const data = await this.service.fetchProductsByShopSlug(query, slug);
            return response.json({
                status: httpStatus.OK,
                data,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async createShop(request, response) {
        try {
            const payload = request.body;

            const { userId } = this.getCredentialInfo(request);

            payload.userId = userId;

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

    async patchStatusShop(request, response) {
        try {
            const { query, params } = request;

            const payload = new PatchStatusDto(params, query);

            await this.service.patchShopStatus(payload);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Update success",
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }
}

export default new ShopController();
