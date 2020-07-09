export default class Handler {
    constructor(Controller, AuthenService = null, AuthorizeService = null, Validator = null) {
        this.controller = Controller;
        this.authen = AuthenService;
        this.authorize = AuthorizeService;
        this.validator = Validator;
    }
}
