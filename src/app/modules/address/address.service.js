import CoreService from "../../concept/Service";
import AddressRepository from "./address.repository";

class AddressService extends CoreService {
    constructor() {
        super();
        this.repository = AddressRepository;
    }

    getAddresses(query, userId) {
        // eslint-disable-next-line no-param-reassign
        query.order = "id";
        const scopes = ["defaultScope"];
        const conditions = {
            userId,
        };
        return this.repository.getMany(query, scopes, conditions);
    }
}

export default new AddressService();
