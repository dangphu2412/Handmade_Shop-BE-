import httpStatus from "http-status";
import Jwt from "../services/Jwt";
import AuthenError from "../errors/Authen.error";

class Authentication {
    constructor() {
        this.tokenService = Jwt;
    }

    verify(request, response, next) {
        try {
            let token = request.headers["x-access-token"] || request.headers["authorization"];
            if (!token) {
                throw new AuthenError("Your token is not supplied");
            }

            if (token.startsWith("Bearer ")) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
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

    call(method) {
        return this[method].bind(this);
    }
}

export default new Authentication();
