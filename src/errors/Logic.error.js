export default class LogicError extends Error {
    constructor(message) {
        super(message);
        this.status = 400
    }
}