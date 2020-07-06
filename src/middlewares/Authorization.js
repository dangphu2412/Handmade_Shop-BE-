import { ROLE } from '../constants/role';
import AuthorizeError from '../errors/Authorize.error';
import { User, Role, Permission } from '../database/models/index';

class Authentication {
    constructor() {
        this.role = ROLE;
    }

    async getScopeAfterAuthenticate(request, response, next) {
        if (!request.auth.isAuthenticated) {
            throw new AuthorizeError('Missing middleware authenticate');
        }
        const { id } = request.auth.credentials;
        const scope = await User.findByPk(id, {
            include: [{
                model: Role,
                through: {
                    attributes: ['roleName'],
                },
                include: [{
                    model: Permission,
                    through: {
                        attributes: ['method', 'module'],
                    },
                }],
            }],
        });
        console.log(scope);
        request.auth.credentials.scope = scope;
        return next();
    }

    authorizeScope(method, module, userScope) {

    }
}

export default new Authentication();
