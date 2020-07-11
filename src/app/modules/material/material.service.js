import CoreService from "../../concept/Service";
import MaterialRepository from "./material.repository";

class MaterialService extends CoreService {
    constructor() {
        super();
        this.repository = MaterialRepository;
    }

    getMaterials(query) {
        return this.repository.getMany(query, null, ["id", "name", "slug"]);
    }
}

export default new MaterialService();
