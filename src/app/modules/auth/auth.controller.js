import httpStatus from "http-status";
import CoreController from "../../concept/Controller";
import AuthService from "./auth.service";
import { ServerConfig } from "../../../constants/secret";

class TestController extends CoreController {
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

            await this.service.verify(token);

            return response.redirect(`${ServerConfig.FRONT_HOST}`);
        } catch (error) {
            return this.ErrorHandler(response, error);
        }
    }

    async signin(request, response) {
        try {
            const payload = request.body;

            const token = await this.service.signin(payload);

            return response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: "Sign in success",
                results: {
                    token,
                },
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

export default new TestController();
