import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import UserService from "./user.service";
import PatchStatus from "./dto/patch-status.dto";

class UserController extends CoreController {
    constructor() {
        super();
        this.service = UserService;
    }

    async patchStatusUser(request, response) {
        try {
            const { params, query } = request;
            const { userId: adminId } = this.getCredentialInfo(request);
            const payload = new PatchStatus(params, query, adminId);
            const data = await this.service.patchStatusUser(payload);
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

export default new UserController();
