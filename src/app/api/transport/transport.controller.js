import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import TransportService from "./transport.service";

class TransportController extends CoreController {
    constructor() {
        super();
        this.service = TransportService;
    }

    async getTransports(request, response) {
        try {
            const { query } = request;
            const data = await this.service.getTransports(query);
            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Get success",
                data,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

}

export default new TransportController();
