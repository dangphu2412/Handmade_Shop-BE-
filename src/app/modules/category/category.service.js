import CoreService from "../../concept/Service";
import CategoryRepository from "./category.repository";

class CategoryService extends CoreService {
    constructor() {
        super();
        this.repository = CategoryRepository;
    }

    getTreeCategories(query) {
        query.order = "id";
        query.by = "ASC";
        const scopes = ["treeCategory"];
        return this.repository.getMany(query, scopes);
    }
}

export default new CategoryService();
