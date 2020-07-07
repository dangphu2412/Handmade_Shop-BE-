import CoreService from "../../concept/Service";
import Repository from "./auth.repository";

class TestService extends CoreService {
    constructor() {
        super();
        this.repository = Repository;
    }

    // createUserWithUserRole(payload) {
    //     return this.repository.createUserWithUserRole(payload);
    // }
}

export default new TestService();
