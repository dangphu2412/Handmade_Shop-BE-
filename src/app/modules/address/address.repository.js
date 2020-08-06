import CoreRepository from "../../concept/Repository";
import { Models } from "../../../database/models/index";

class AddressRepository extends CoreRepository {
    constructor() {
        const { Address } = Models;
        super(Address);
    }
}

export default new AddressRepository();
