import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import TransportService from "./transport.service";

class TransportController extends CoreController {
    constructor() {
        super();
        this.service = TransportService;
    }

    async getTransport(request, response) {
        try {
            const { query } = request;
            const results = await this.service.getTransports(query);
            return response.json({
                status: httpStatus.OK,
                results,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }
}

export default new TransportController();
