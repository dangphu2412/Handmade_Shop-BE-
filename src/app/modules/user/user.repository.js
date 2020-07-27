import CoreRepository from "../../concept/Repository";
import { Models } from "../../../database/models/index";

class AuthRepository extends CoreRepository {
    constructor() {
        const { User } = Models;
        super(User);
    }
}

export default new AuthRepository();
