import CoreRepository from "../../concept/Repository";
import { Models } from "../../../database/models/index";
import ServerError from "../../../errors/Server.error";

class AddressRepository extends CoreRepository {
    constructor() {
        const { Address } = Models;
        super(Address);
    }

    deleteOne(id, transaction = null) {
        try {
            return this.updateOne({
                deletedAt: new Date().toISOString(),
            }, id, transaction);
        } catch (error) {
            console.log(error);
            throw new ServerError(this.serverMessageError);
        }
    }
}

export default new AddressRepository();
