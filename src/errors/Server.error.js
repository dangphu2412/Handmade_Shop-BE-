export default class ServerError extends Error {
    constructor(message) {
        super(message);
        this.status = 500
    }
}