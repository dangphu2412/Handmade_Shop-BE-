import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import AuthService from "./auth.service";

class AuthController extends CoreController {
    constructor() {
        super();
        this.service = AuthService;
    }

    async signup(request, response) {
        try {
            const payload = request.body;

            await this.service.signup(payload);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Sign up success",
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async verifyAccount(request, response) {
        try {
            const { query } = request;
            const { token } = query;

            const responseData = await this.service.verify(token);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Verify success",
                data: responseData,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async signin(request, response) {
        try {
            const payload = request.body;

            const responseData = await this.service.signin(payload);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Sign in success",
                data: responseData,
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async oauthGoogle(request, response) {
        try {
            const payload = request.body;

            await this.service.create(payload);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Sign up success",
            });
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }
}

export default new AuthController();
