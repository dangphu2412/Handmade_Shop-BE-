export default class AuthorizeError extends Error {
    constructor(message) {
        super(message);
        this.status = 403;
    }
}