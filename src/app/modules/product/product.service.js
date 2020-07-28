import slugTransfer from "speakingurl";

import CoreService from "../../concept/Service";
import ProductRepository from "./product.repository";
import ServerError from "../../../errors/Server.error";
import database from "../../../database/models/index";

class ProductService extends CoreService {
    constructor() {
        super();
        this.repository = ProductRepository;
    }

    fetchProductDetail(slug) {
        const conditions = {
            slug,
        };
        const scopes = ["category", "materials", "transports", "gallery"];
        return this.repository.getOne(conditions, scopes);
    }

    async createProduct(payload) {
        const transaction = await database.transaction();

        try {
            const {
                materialIds,
                transportIds,
                ...productPayload
            } = payload;
            let include = ["gallery"];

            productPayload.slug = slugTransfer(productPayload.name);
            productPayload.restAmount = productPayload.amount;
            if (!productPayload.gallery) {
                include = null;
            }

            const productInfo = await this.repository.create(productPayload, transaction, null, include);

            await productInfo.addMaterials(materialIds, { transaction });
            await productInfo.addTransports(transportIds, { transaction });
            await transaction.commit();
            return productInfo;
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            throw new ServerError("Server is crashing");
        }
    }
}

export default new ProductService();
