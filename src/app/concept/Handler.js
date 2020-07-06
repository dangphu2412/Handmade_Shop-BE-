export default class Handler {
    constructor(Controller, AuthenService, AuthorizeService, Validator) {
        this.controller = Controller;
        this.authen = AuthenService;
        this.authorize = AuthorizeService;
        this.validator = Validator;
    }
}
