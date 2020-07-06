export default class AuthenError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}
