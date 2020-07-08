import slugTransfer from "speakingurl";
import bcrypt from "bcrypt";

import { saltRounds } from "../../../constants/secret";
import CoreService from "../../concept/Service";
import AuthRepository from "./auth.repository";
import LogicError from "../../../errors/Logic.error";

class AuthService extends CoreService {
    constructor() {
        super();
        this.repository = AuthRepository;
    }

    async signup(payload) {
        const { username } = payload;
        const isExistWithEmail = await this.repository.getOneByUsername(username);

        if (isExistWithEmail) {
            throw new LogicError("Your username has already been existed");
        }

        const hashedPassword = bcrypt.hashSync(payload.password, saltRounds);
        const slug = slugTransfer(payload.username, { uric: true });

        const payloadFromService = {
            username,
            name: payload.name,
            slug,
            password: hashedPassword,
        };

        return this.repository.create(payloadFromService);
    }

    async signin(payload) {
        const { username } = payload;
        const userInfo = await this.repository.getOneByUsername(username);
        console.log(userInfo);
        if (!userInfo || !userInfo.status || payload.password !== bcrypt.compareSync(userInfo.password, saltRounds)) {
            throw new LogicError("Your account is not valid");
        }

        return true;
    }
}

export default new AuthService();
