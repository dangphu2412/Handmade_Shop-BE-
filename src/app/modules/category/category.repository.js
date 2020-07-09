import CoreRepository from "../../concept/Repository";
import { Category } from "../../../database/models/index";

class CategoryRepository extends CoreRepository {
    constructor() {
        super(Category);
    }
}

export default new CategoryRepository();
