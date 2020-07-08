import CoreRepository from "../../concept/Repository";
import { User } from "../../../database/models/index";

class AuthRepository extends CoreRepository {
    constructor() {
        super(User);
    }

    getOneByUsername(field) {
        return this.model.findOne({
            raw: true,
            where: {
                username: field,
            },
        });
    }
}

export default new AuthRepository();
