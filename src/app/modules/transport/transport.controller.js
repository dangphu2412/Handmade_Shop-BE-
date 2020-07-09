import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import AuthService from "./transport.service";

class TransportController extends CoreController {
    constructor() {
        super();
        this.service = AuthService;
    }

    async createTransport(request, response) {
        try {
            const payload = request.body;

            await this.service.create(payload);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Create Transport success",
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }
}

export default new TransportController();
