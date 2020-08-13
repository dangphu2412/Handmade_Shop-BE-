import CoreService from "../../concept/Service";

import UserRepository from "./user.repository";

import LogicError from "../../../errors/Logic.error";

class UserService extends CoreService {
    constructor() {
        super();
        this.repository = UserRepository;
    }
}

export default new UserService();
