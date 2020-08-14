import CoreService from "../../concept/Service";

import UserRepository from "./user.repository";

import AuthorizeError from "../../../errors/Authorize.error";

class UserService extends CoreService {
    constructor() {
        super();
        this.repository = UserRepository;
    }

    async patchStatusUser(payload) {
        const { id, status, adminId } = payload;

        if (adminId === id) {
            throw new AuthorizeError("You can't delete yourself ADMIN !!!");
        }

        const user = await this.repository.getByPk(id);

        user.status = status;
        await user.save();
    }
}

export default new UserService();
