import { ROLE } from "../constants/role";
import AuthorizeError from "../errors/Authorize.error";
import { User, Role, Permission } from "../database/models/index";

class Authentication {
    constructor() {
        this.role = ROLE;
    }

    async getScopeAfterAuthenticate(request, response, next) {
        if (!request.auth.isAuthenticated) {
            throw new AuthorizeError("Missing middleware authenticate");
        }
        const { id } = request.auth.credentials;
        const scope = await User.findOne({
            where: { id },
            include: [{
                model: Role,
                as: "role",
                attributes: ["roleName"],
                include: [{
                    model: Permission,
                    as: "permissions",
                    attributes: ["id", "method", "module"],
                    where: { status: true }
                }],
            }],
        });

        request.auth.credentials.scope = {
            scope: scope.role.roleName,
            permissions: scope.role.permissions,
        };
        return next();
    }

    authorizeScope(method, module, userScope) {

    }
}

export default new Authentication();
