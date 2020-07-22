import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import MaterialService from "./material.service";

class MaterialController extends CoreController {
    constructor() {
        super();
        this.service = MaterialService;
    }

    async getMaterials(request, response) {
        try {
            const { query } = request;
            const data = await this.service.getMaterials(query);
            return response.json({
                status: httpStatus.OK,
                data,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }
}

export default new MaterialController();
