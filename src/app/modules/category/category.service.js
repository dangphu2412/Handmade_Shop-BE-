import CoreService from "../../concept/Service";
import CategoryRepository from "./category.repository";
import ServerError from "../../../errors/Server.error";

class CategoryService extends CoreService {
    constructor() {
        super();
        this.repository = CategoryRepository;
    }

    async upload(file) {
        try {

        } catch (error) {

        }
    }
}

export default new CategoryService();
