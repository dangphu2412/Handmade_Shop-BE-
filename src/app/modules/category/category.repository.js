import CoreRepository from "../../concept/Repository";
import { Models } from "../../../database/models/index";

class CategoryRepository extends CoreRepository {
    constructor() {
        const { Category } = Models;
        super(Category);
    }
}

export default new CategoryRepository();
