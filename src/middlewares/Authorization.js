import AuthorizeError from "../errors/Authorize.error";
import { User, Role, Permission } from "../database/models/index";

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
        if (!request.auth.isAuthenticated) {
            throw new AuthorizeError("Backend forgot to pass middleware");
        }
        const { id, scope: required } = request.auth.credentials;

        const userScope = await User.findOne({
            where: { id },
            include: [{
                model: Role,
                as: "role",
                attributes: ["roleName"],
                include: [{
                    model: Permission,
                    as: "permissions",
                    attributes: ["method", "module"],
                    where: { status: true },
                    through: [{}],
                }],
            }],
        });
        const { role: roleRequired, method: methodRequired, module: moduleRequired} = required;
        const { role } = userScope;
        const { permissions, roleName } = role;

        permissions.forEach((permission) => {
            if (permission.method === methodRequired && permission.module === moduleRequired) {
                return next();
            }
        });

        throw new AuthorizeError(`Your role ${roleName} is not allowed to do this action. You should be ${roleRequired}`);
    }
}

export default new Authentication();
