export class ServerError extends Error {
    status;
    constructor(message) {
        super(message);
        this.status = 500
    }
}