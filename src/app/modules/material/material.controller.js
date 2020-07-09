import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import AuthService from "./material.service";

class MaterialController extends CoreController {
    constructor() {
        super();
        this.service = AuthService;
    }

    async createMaterial(request, response) {
        try {
            const payload = request.body;

            await this.service.create(payload);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Create Material success",
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }
}

export default new MaterialController();
