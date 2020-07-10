import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import AreaService from "./area.service";

class AreaController extends CoreController {
    constructor() {
        super();
        this.service = AreaService;
    }

    async getCities(request, response) {
        try {
            const { query } = request;
            const results = await this.service.getCities(query);
            return response.json({
                status: httpStatus.OK,
                results,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async getDistrictsByCity(request, response) {
        try {
            const { params, query } = request;

            const results = await this.service.getDistrictsByCity(params, query);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Get success Area success",
                results,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }
}

export default new AreaController();
