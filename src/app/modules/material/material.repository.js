import CoreRepository from "../../concept/Repository";
import { Material } from "../../../database/models/index";

class MaterialRepository extends CoreRepository {
    constructor() {
        super(Material);
    }
}

export default new MaterialRepository();
