import CoreRepository from "../../concept/Repository";
import { User } from "../../../database/models/index";

class AuthRepository extends CoreRepository {
    constructor() {
        super(User);
    }
}

export default new AuthRepository();
