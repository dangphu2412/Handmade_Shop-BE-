import CoreRepository from "../../concept/Repository";
import { User } from "../../../database/models/index";

class AuthRepository extends CoreRepository {
    constructor() {
        super(User);
    }

    getOneByUsername(field) {
        return this.model.findOne({
            where: {
                username: field,
            },
        });
    }
}

export default new AuthRepository();
