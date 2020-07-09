import httpStatus from "http-status";
import Jwt from "../services/Jwt";
import AuthenError from "../errors/Authen.error";

export default new class Authentication {
    constructor() {
        this.tokenService = Jwt;
    }

    verify(request, response, next) {
        try {
            const token = request.headers["x-access-token"];

            if (!token) {
                throw new AuthenError("Your token is not supplied");
            }

            const credentials = this.tokenService.decode(token);

            if (!credentials) {
                throw new AuthenError("Your token is invalid");
            }

            request.auth = {
                isAuthenticated: true,
                credentials,
            };

            return next();
        } catch (error) {
            return response.status(httpStatus.UNAUTHORIZED).json({
                status: error.status,
                message: error.message,
            });
        }
    }
}();
