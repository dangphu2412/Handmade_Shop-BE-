import slugTransfer from "speakingurl";
import bcrypt from "bcrypt";

import { saltRounds } from "../../../constants/secret";

import CoreService from "../../concept/Service";
import TokenService from "../../../services/Jwt";
import MailService from "../../../services/Mailer";

import AuthRepository from "./auth.repository";

import LogicError from "../../../errors/Logic.error";

class AuthService extends CoreService {
    constructor() {
        super();
        this.repository = AuthRepository;
    }

    async signup(payload) {
        const { username, password, name } = payload;
        const isExistWithEmail = await this.repository.getOneByUsername(username);

        if (isExistWithEmail) {
            throw new LogicError("Your username has already been existed");
        }

        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const slug = slugTransfer(name, { uric: true });

        const payloadFromService = {
            username,
            name,
            slug,
            password: hashedPassword,
        };

        const returnedData = await this.repository.create(payloadFromService);

        let verifyToken = TokenService.sign({
            id: returnedData.id,
            email: username,
            status: returnedData.status,
        });

        verifyToken += "AlBb";

        const transporter = MailService.createTransport(MailService.getTransportOptions());
        const sendMailOptions = MailService.getSendMailOptions(username, verifyToken);
        await MailService.sendMail(transporter, sendMailOptions);
    }

    async verify(token) {
        const verifyToken = token.slice(0, -4);
        const tokenCredentials = TokenService.decode(verifyToken);
        const { id, email, status } = tokenCredentials;

        const userInfo = await this.repository.getOne(id);
        if (userInfo.status || userInfo.status !== status) {
            throw new LogicError("Your email has already been verified");
        }

        if (userInfo.username === email) {
            await this.updateOne({ status: true }, id);
            const signPayload = {
                id: userInfo.id,
                slug: userInfo.slug,
            };
            const signToken = TokenService.sign(signPayload);
            const dataResponse = {
                userInfo,
                token: signToken,
            };
            return dataResponse;
        }

        throw new LogicError("Your email is not fit to your id");
    }

    async signin(payload) {
        const { username } = payload;
        const userInfo = await this.repository.getOneByUsername(username);

        if (!userInfo || !userInfo.status || bcrypt.compareSync(userInfo.password, payload.password)) {
            throw new LogicError("Your account is not valid");
        }

        const signPayload = {
            id: userInfo.id,
            slug: userInfo.slug,
        };

        const signToken = TokenService.sign(signPayload);
        return {
            token: signToken,
            userInfo,
        };
    }
}

export default new AuthService();
