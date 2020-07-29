import slugTransfer from "speakingurl";
import bcrypt from "bcrypt";

import { saltRounds } from "../../../constants/secret";

import CoreService from "../../concept/Service";
import TokenService from "../../../services/Jwt";
import MailService from "../../../services/Mailer";

import AuthRepository from "./auth.repository";

import AuthenError from "../../../errors/Authen.error";
import LogicError from "../../../errors/Logic.error";

class AuthService extends CoreService {
    constructor() {
        super();
        this.repository = AuthRepository;
    }

    async signup(payload) {
        const { username, password, name } = payload;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const slug = slugTransfer(name, { uric: true });

        const payloadFromService = {
            username,
            name,
            slug,
            password: hashedPassword,
        };

        const returnedData = await this.findNotThenCreate(payloadFromService,
        { username }, null,
        "Your username has already been existed");

        let verifyToken = TokenService.sign({
            id: returnedData.id,
            email: username,
            status: returnedData.status,
        });

        verifyToken += "AlBb";

        const transporter = MailService.createTransport(MailService.getTransportOptions());
        const sendMailOptions = MailService.getSendMailOptions(username, verifyToken);
        MailService.sendMail(transporter, sendMailOptions);
    }

    async verify(token) {
        const verifyToken = token.slice(0, -4);
        const tokenCredentials = TokenService.decode(verifyToken);

        if (!tokenCredentials) {
            throw new AuthenError("Your token is out of date");
        }

        const { id, email, status } = tokenCredentials;

        const userInfo = await this.repository.getByPk(id);

        if (userInfo.status || userInfo.status !== status) {
            throw new LogicError("Your email has already been verified");
        }

        if (userInfo.username !== email) {
            throw new LogicError("Your email is not fit to your id");
        }
        await this.repository.updateOne({ status: true }, id);
        const signPayload = {
            id: userInfo.id,
            slug: userInfo.slug,
        };
        const signToken = TokenService.sign(signPayload);

        delete userInfo.status;

        const dataResponse = {
            userInfo,
            token: signToken,
        };
        return dataResponse;
    }

    async signin(payload) {
        const { username, password } = payload;
        const conditions = { username, status: true };
        const userInfo = await this.repository.getOne(conditions);

        if (!userInfo) {
            throw new LogicError("Your account is not valid");
        }
        if (!bcrypt.compareSync(password, userInfo.password)) {
            throw new LogicError("Your password is not valid");
        }

        delete userInfo.password;
        delete userInfo.status;

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
