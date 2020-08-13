import CoreService from "../../concept/Service";
import MaterialRepository from "./material.repository";

class MaterialService extends CoreService {
    constructor() {
        super();
        this.repository = MaterialRepository;
    }
}

export default new MaterialService();
