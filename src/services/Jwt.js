import jwt from 'jsonwebtoken';
import { JwtConfig } from '../constants/secret';

export default class JWT {
    constructor() {
        this.jwt = jwt;
        this.secrect = JwtConfig.SECRET_KEY;
        this.expire = JwtConfig.EXPIRE_DATE;
    }

    sign(payload, expireDate = this.expire) {
        return this.jwt.sign(payload, this.secrect, {
            expiresIn: expireDate,
        });
    }

    decode(token) {
        return this.jwt.decode(token);
    }
}