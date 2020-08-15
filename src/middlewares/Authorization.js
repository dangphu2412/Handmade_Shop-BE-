import httpStatus from "http-status";
import AuthorizeError from "../errors/Authorize.error";
import { Models } from "../database/models";

const { User } = Models;

class Authentication {
    WithScope(role, method, module) {
        const passScope = (request, response, next) => {
            request.auth.credentials.scope = {
                role,
                method,
                module,
            };
            return next();
        };
        return [
            passScope,
            this.Authorize,
        ];
    }

    async Authorize(request, response, next) {
        try {
            if (!request.auth.isAuthenticated) {
                throw new AuthorizeError("Backend forgot to pass middleware");
            }
            const { id, scope: required } = request.auth.credentials;

            const userScope = await User.scope("authorize").findOne({
                where: { id },
            });

            const { role: roleRequired, method: methodRequired, module: moduleRequired } = required;
            const { role } = userScope;
            const { permissions, rolename } = role;
            for (let index = 0; index < permissions.length; index += 1) {
                const permission = permissions[index].get({ plain: true });
                if (permission.method === methodRequired && permission.module === moduleRequired) {
                    return next();
                }
            }

            throw new AuthorizeError(`Your role ${rolename} is not allowed to do this action. You should be ${roleRequired}`);
        } catch (error) {
            console.log(error);
            return response.status(httpStatus.OK).json({
                status: error.status,
                message: error.message,
            });
        }
    }

    withOrScope(scopes) {
        const passScope = (request, response, next) => {
            request.auth.credentials.scopes = scopes;
            return next();
        };
        return [
            passScope,
            this.authorizeWithOr,
        ];
    }

    async authorizeWithOr(request, response, next) {
        const { id, scopes } = request.auth.credentials;
        const userScope = await User.scope("authorize").findOne({
            where: { id },
        });
        const { role } = userScope;
        const { permissions, rolename } = role;
        for (let index = 0; index < scopes.length; index += 1) {
            const required = scopes[index];

            const { role: roleRequired, method: methodRequired, module: moduleRequired } = required;

            for (let j = 0; j < permissions.length; j += 1) {
                const permission = permissions[j].get({ plain: true });
                if (permission.method === methodRequired && permission.module === moduleRequired) {
                    request.auth.credentials.role = {
                        rolename,
                    };
                    return next();
                }
            }
        }
        throw new AuthorizeError(`You are not allow to do this action ${rolename}`);
    }
}

export default new Authentication();
