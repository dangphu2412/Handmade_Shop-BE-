import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import AuthService from "./shop.service";

class ShopController extends CoreController {
    constructor() {
        super();
        this.service = AuthService;
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
