import CoreRepository from "../../concept/Repository";
import { Models } from "../../../database/models/index";

class MaterialRepository extends CoreRepository {
    constructor() {
        const { Material } = Models;
        super(Material);
    }
}

export default new MaterialRepository();
